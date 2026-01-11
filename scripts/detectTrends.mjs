/**
 * Trend Detection Script
 * Fetches trending topics from free sources (Reddit, RSS feeds)
 * Returns top trending items suitable for news generation
 */

import fs from "fs";
import path from "path";

const POSTS_DIR = path.join(process.cwd(), "posts");

// Reddit subreddits to monitor
const SUBREDDITS = [
  "technology",
  "artificial",
  "OpenAI",
  "MachineLearning",
  "startups",
  "tech",
  "programming"
];

// RSS feed URLs
const RSS_FEEDS = [
  "https://openai.com/blog/rss.xml",
  "https://blog.google/rss/",
  "https://about.fb.com/news/feed/",
  "https://www.apple.com/newsroom/rss-feed.rss"
];

/**
 * Fetch Reddit posts from a subreddit
 */
async function fetchRedditPosts(subreddit, sort = "new", limit = 10) {
  try {
    const url = `https://www.reddit.com/r/${subreddit}/${sort}.json?limit=${limit}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'InfoDaily/1.0 (News Bot)'
      }
    });

    if (!response.ok) {
      console.warn(`⚠️ Failed to fetch r/${subreddit}: ${response.status}`);
      return [];
    }

    const data = await response.json();
    if (!data.data || !data.data.children) return [];

    return data.data.children
      .filter(post => post.data && !post.data.stickied)
      .map(post => ({
        title: post.data.title,
        url: `https://reddit.com${post.data.permalink}`,
        score: post.data.score,
        comments: post.data.num_comments,
        created: post.data.created_utc,
        subreddit: post.data.subreddit,
        engagement: post.data.score + (post.data.num_comments * 2) // Weighted engagement
      }))
      .filter(item => item.engagement > 5); // Filter low engagement
  } catch (error) {
    console.warn(`⚠️ Error fetching r/${subreddit}:`, error.message);
    return [];
  }
}

/**
 * Simple RSS parser (basic XML parsing)
 */
async function fetchRSSFeed(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'InfoDaily/1.0 (News Bot)'
      }
    });

    if (!response.ok) {
      console.warn(`⚠️ Failed to fetch RSS ${url}: ${response.status}`);
      return [];
    }

    const xml = await response.text();
    const items = [];

    // Simple regex-based RSS parsing (works for most standard RSS feeds)
    const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
    let match;

    while ((match = itemRegex.exec(xml)) !== null && items.length < 10) {
      const itemContent = match[1];
      const titleMatch = itemContent.match(/<title>(<!\[CDATA\[)?([\s\S]*?)(\]\]>)?<\/title>/i);
      const linkMatch = itemContent.match(/<link>([\s\S]*?)<\/link>/i);
      const pubDateMatch = itemContent.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);

      if (titleMatch && linkMatch) {
        const title = (titleMatch[2] || titleMatch[1]).replace(/<[^>]*>/g, '').trim();
        const link = linkMatch[1].trim();
        const pubDate = pubDateMatch ? pubDateMatch[1].trim() : new Date().toISOString();

        // Check if published within last 24 hours
        const pubDateObj = new Date(pubDate);
        const hoursAgo = (Date.now() - pubDateObj.getTime()) / (1000 * 60 * 60);
        
        if (hoursAgo <= 24) {
          items.push({
            title,
            url: link,
            source: url,
            published: pubDateObj.toISOString(),
            hoursAgo
          });
        }
      }
    }

    return items;
  } catch (error) {
    console.warn(`⚠️ Error fetching RSS ${url}:`, error.message);
    return [];
  }
}

/**
 * Get existing post titles to avoid duplicates
 */
function getExistingTitles() {
  if (!fs.existsSync(POSTS_DIR)) return new Set();
  
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  const titles = new Set();

  files.forEach(file => {
    try {
      const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
      const titleMatch = content.match(/^title:\s*"([^"]+)"/m);
      if (titleMatch) {
        titles.add(titleMatch[1].toLowerCase());
      }
    } catch (e) {
      // Skip invalid files
    }
  });

  return titles;
}

/**
 * Check if a post was published today (to limit daily posts)
 */
function getTodayPostCount() {
  if (!fs.existsSync(POSTS_DIR)) return 0;
  
  const today = new Date().toISOString().split('T')[0];
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.startsWith(today));
  return files.length;
}

/**
 * Deduplicate and score trending items
 */
function scoreAndDeduplicate(items) {
  const seen = new Map();
  const existingTitles = getExistingTitles();

  items.forEach(item => {
    const key = item.title.toLowerCase().slice(0, 100);
    
    // Skip if we already published this
    if (existingTitles.has(key)) return;

    if (!seen.has(key)) {
      seen.set(key, {
        ...item,
        sources: 1,
        score: item.engagement || item.hoursAgo ? (100 / (item.hoursAgo || 1)) : 1
      });
    } else {
      // Merge duplicates (same topic from multiple sources)
      const existing = seen.get(key);
      existing.sources++;
      existing.score += item.engagement || (100 / (item.hoursAgo || 1));
    }
  });

  return Array.from(seen.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 5); // Top 5 trending items
}

/**
 * Main function to detect trends
 */
export async function detectTrends() {
  console.log("🔍 Detecting trends from free sources...");

  const allItems = [];
  const todayCount = getTodayPostCount();

  // Check daily limit (max 15 posts per day)
  if (todayCount >= 15) {
    console.log(`ℹ️ Daily limit reached (${todayCount}/15 posts today)`);
    return [];
  }

  // Fetch from Reddit
  console.log("📱 Fetching Reddit posts...");
  for (const subreddit of SUBREDDITS.slice(0, 5)) { // Limit to 5 subreddits per run
    try {
      const posts = await fetchRedditPosts(subreddit, "new", 5);
      allItems.push(...posts.map(p => ({
        ...p,
        type: 'reddit',
        hoursAgo: (Date.now() / 1000 - p.created) / 3600
      })));
      // Small delay to be respectful
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (e) {
      console.warn(`⚠️ Error with r/${subreddit}:`, e.message);
    }
  }

  // Fetch from RSS feeds
  console.log("📰 Fetching RSS feeds...");
  for (const feedUrl of RSS_FEEDS.slice(0, 3)) { // Limit to 3 RSS feeds per run
    try {
      const items = await fetchRSSFeed(feedUrl);
      allItems.push(...items.map(i => ({ ...i, type: 'rss' })));
      // Small delay to be respectful
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (e) {
      console.warn(`⚠️ Error with RSS ${feedUrl}:`, e.message);
    }
  }

  // Score, deduplicate, and rank
  const trending = scoreAndDeduplicate(allItems);

  console.log(`✅ Found ${trending.length} trending items`);
  return trending;
}

// If run directly, execute and output results
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('detectTrends.mjs')) {
  detectTrends().then(trends => {
    console.log("\n📊 Top Trending Items:");
    trends.forEach((item, i) => {
      console.log(`${i + 1}. ${item.title} (Score: ${item.score.toFixed(1)}, Sources: ${item.sources})`);
    });
  }).catch(console.error);
}

// Export for use in other modules
export { detectTrends };

