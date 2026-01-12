/**
 * Trend Detection Script
 * Fetches trending topics from free sources (Times of India RSS + Reddit)
 * Returns top trending items suitable for news generation
 */

import fs from "fs";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "posts");

/* -------------------- REDDIT (SECONDARY) -------------------- */
const SUBREDDITS = [
  "technology",
  "artificial",
  "MachineLearning",
  "startups"
];

/* -------------------- TIMES OF INDIA RSS -------------------- */
const RSS_FEEDS = [
  {
    url: "https://timesofindia.indiatimes.com/rssfeedstopstories.cms",
    category: "Top Stories",
    weight: 5
  },
  {
    url: "https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms",
    category: "India News",
    weight: 4
  },
  {
    url: "https://timesofindia.indiatimes.com/rssfeeds/296589292.cms",
    category: "World News",
    weight: 4
  },
  {
    url: "https://timesofindia.indiatimes.com/rssfeeds/66949542.cms",
    category: "Technology",
    weight: 5
  },
  {
    url: "https://timesofindia.indiatimes.com/rssfeeds/1898055.cms",
    category: "Business",
    weight: 4
  },
  {
    url: "https://timesofindia.indiatimes.com/rssfeeds/913168846.cms",
    category: "Education",
    weight: 3
  },
  {
    url: "https://timesofindia.indiatimes.com/rssfeeds/3908999.cms",
    category: "Health",
    weight: 3
  }
];

/* -------------------- UTILS -------------------- */
const sleep = ms => new Promise(r => setTimeout(r, ms));

function normalizeTitle(title) {
  return title
    .toLowerCase()
    .replace(/\b(google|india|ai|breaking|today|news|latest|highlights|says|ceo|toi|times of india)\b/g, "")
    .replace(/\b(nrf|2023|2024|2025|2026)\b/g, "")
    .replace(/[^a-z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/* -------------------- EXISTING POSTS -------------------- */
function getExistingTitles() {
  if (!fs.existsSync(POSTS_DIR)) return new Set();

  const titles = new Set();
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".md"));

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const match = content.match(/^title:\s*"([^"]+)"/m);
      if (match) titles.add(normalizeTitle(match[1]));
    } catch {}
  }
  return titles;
}

function getTodayPostCount() {
  if (!fs.existsSync(POSTS_DIR)) return 0;
  const today = new Date().toISOString().split("T")[0];
  return fs.readdirSync(POSTS_DIR).filter(f => f.startsWith(today)).length;
}

/* -------------------- REDDIT FETCH -------------------- */
async function fetchRedditPosts(subreddit) {
  try {
    const res = await fetch(
      `https://www.reddit.com/r/${subreddit}/new.json?limit=5`,
      { headers: { "User-Agent": "InfoDaily/1.0" } }
    );
    if (!res.ok) return [];

    const json = await res.json();
    return json.data.children
      .map(p => ({
        title: p.data.title,
        url: `https://reddit.com${p.data.permalink}`,
        engagement: p.data.score + p.data.num_comments * 2,
        hoursAgo: (Date.now() / 1000 - p.data.created_utc) / 3600,
        type: "reddit"
      }))
      .filter(p => p.engagement > 15 && p.hoursAgo <= 12);
  } catch {
    return [];
  }
}

/* -------------------- RSS FETCH -------------------- */
async function fetchRSSFeed(feed) {
  try {
    const res = await fetch(feed.url, {
      headers: { "User-Agent": "InfoDaily/1.0" }
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const items = [];
    const regex = /<item>([\s\S]*?)<\/item>/gi;
    let match;

    while ((match = regex.exec(xml)) && items.length < 8) {
      const block = match[1];
      const title = block.match(/<title>(<!\[CDATA\[)?([\s\S]*?)(\]\]>)?<\/title>/i)?.[2];
      const link = block.match(/<link>([\s\S]*?)<\/link>/i)?.[1];
      const pub = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i)?.[1];

      if (!title || !link) continue;

      const date = new Date(pub || Date.now());
      const hoursAgo = (Date.now() - date.getTime()) / 36e5;

      if (hoursAgo <= 24) {
        items.push({
          title: title.replace(/<[^>]+>/g, "").trim(),
          url: link.trim(),
          category: feed.category,
          hoursAgo,
          engagement: feed.weight * (100 / (hoursAgo + 1)),
          type: "rss"
        });
      }
    }
    return items;
  } catch {
    return [];
  }
}

/* -------------------- DEDUP + SCORE -------------------- */
function scoreAndDeduplicate(items) {
  const existing = getExistingTitles();
  const map = new Map();

  for (const item of items) {
    const key = normalizeTitle(item.title).slice(0, 120);
    if (!key || existing.has(key)) continue;

    if (!map.has(key)) {
      map.set(key, { ...item, score: item.engagement, sources: 1 });
    } else {
      const prev = map.get(key);
      prev.score += item.engagement;
      prev.sources++;
    }
  }

  return [...map.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

/* -------------------- MAIN -------------------- */
export async function detectTrends() {
  console.log("🔍 Detecting trends (TOI + Reddit)");

  if (getTodayPostCount() >= 15) {
    console.log("ℹ️ Daily post limit reached");
    return [];
  }

  const all = [];

  // Reddit (limited)
  for (const sub of SUBREDDITS.slice(0, 2)) {
    all.push(...await fetchRedditPosts(sub));
    await sleep(400);
  }

  // Times of India RSS (primary)
  for (const feed of RSS_FEEDS) {
    all.push(...await fetchRSSFeed(feed));
    await sleep(400);
  }

  const trends = scoreAndDeduplicate(all);
  console.log(`✅ Found ${trends.length} unique trending items`);
  return trends;
}

/* -------------------- CLI TEST -------------------- */
if (process.argv[1]?.endsWith("detectTrends.mjs")) {
  detectTrends().then(list => {
    list.forEach((t, i) =>
      console.log(`${i + 1}. ${t.title} (${t.category || t.type})`)
    );
  });
}
