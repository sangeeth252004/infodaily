/**
 * News Generation Script
 * Detects trends and generates news-style articles using Gemini AI
 */

import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { detectTrends } from "./detectTrends.mjs";

const POSTS_DIR = path.join(process.cwd(), "posts");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// News-style categories
const NEWS_CATEGORIES = {
  ai: "Breaking AI",
  technology: "Tech Updates",
  startup: "Startup News",
  tools: "Tools & Launches",
  internet: "Internet Trends"
};

// Model fallback list
const MODEL_NAMES = [
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
  "gemini-2.0-pro",
  "gemini-1.5-flash-latest"
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/**
 * Map trending topic to news category
 */
function mapToNewsCategory(topic, source) {
  const title = topic.title.toLowerCase();
  
  if (title.includes("ai") || title.includes("artificial intelligence") || 
      title.includes("openai") || title.includes("gpt") || title.includes("llm")) {
    return "ai";
  }
  if (title.includes("startup") || title.includes("funding") || 
      title.includes("venture") || title.includes("seed")) {
    return "startup";
  }
  if (title.includes("tool") || title.includes("launch") || 
      title.includes("release") || title.includes("announcement")) {
    return "tools";
  }
  if (title.includes("internet") || title.includes("web") || 
      title.includes("online") || title.includes("digital")) {
    return "internet";
  }
  
  return "technology"; // Default
}

/**
 * Qualify if a trend is worth publishing as news
 */
function qualifyTrend(topic) {
  // Must be recent (within last 24 hours)
  if (topic.hoursAgo > 24) {
    return false;
  }

  // Must have meaningful engagement or be from official source
  if (topic.type === 'reddit' && (!topic.engagement || topic.engagement < 10)) {
    return false;
  }

  // Skip if title is too short or too long
  if (topic.title.length < 20 || topic.title.length > 200) {
    return false;
  }

  // Skip generic/clickbait patterns
  const skipPatterns = [
    /^(\d+|\w+) (reasons|things|ways|tips)/i,
    /^(why|how) (everyone|you should)/i,
    /click here/i,
    /you won't believe/i
  ];

  for (const pattern of skipPatterns) {
    if (pattern.test(topic.title)) {
      return false;
    }
  }

  return true;
}

/**
 * Generate news article from trending topic
 */
async function generateNewsArticle(topic) {
  try {
    const category = mapToNewsCategory(topic);
    const categoryLabel = NEWS_CATEGORIES[category] || "Tech Updates";

    console.log(`📰 Generating news article: ${topic.title.substring(0, 60)}...`);
    console.log(`📂 Category: ${categoryLabel}`);

    // Create news-style prompt
    const prompt = `You are a professional news journalist writing a factual news article about a trending technology topic.

WRITING STYLE:
- Write in a neutral, journalistic tone
- Be factual and objective - no opinions or speculation
- Use clear, concise sentences (news style, not blog style)
- Lead with the most important information (inverted pyramid)
- Include specific details and facts
- Write in third person

ARTICLE STRUCTURE:
1. Opening paragraph: What happened (who, what, when, where)
2. Body paragraphs: Why it matters, key details, impact
3. Supporting details: Use bullet points where helpful
4. Closing: What happens next (if relevant)

CONTENT REQUIREMENTS:
- 400-700 words total
- Neutral, factual reporting only
- NO clickbait or sensational language
- NO false claims or unsupported statements
- NO personal opinions or editorial commentary
- Include concrete details: names, dates, numbers where relevant
- AdSense-safe and SEO-friendly
- One clear angle per article

TOPIC TO REPORT ON:
Title: "${topic.title}"
Source: ${topic.type === 'reddit' ? `r/${topic.subreddit} on Reddit` : 'Official company announcement'}
Original URL: ${topic.url || 'N/A'}

IMPORTANT: Write as a NEWS ARTICLE, not a blog post. Focus on facts, not analysis or opinions. Report what happened, why it matters, and what the implications are.

Return the output in this exact format:

TITLE:
META_DESCRIPTION:
KEYWORDS:
CONTENT:`;

    let textResponse;
    let usedModel = "";

    // Try models in order
    for (const modelName of MODEL_NAMES) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        textResponse = response.text();
        usedModel = modelName;
        console.log(`✅ Generated with ${modelName}`);
        break;
      } catch (error) {
        console.warn(`⚠️ Failed with ${modelName}: ${error.message.split(' ')[0]}...`);
      }
    }

    if (!textResponse) {
      throw new Error("All AI models failed");
    }

    // Parse response
    const title = textResponse.match(/TITLE:(.*?)(?:\n|$)/)?.[1]?.trim();
    const description = textResponse.match(/META_DESCRIPTION:(.*?)(?:\n|$)/)?.[1]?.trim();
    const keywords = textResponse.match(/KEYWORDS:(.*?)(?:\n|$)/)?.[1]?.trim();
    const content = textResponse.split("CONTENT:")[1]?.trim();

    if (!title || !content) {
      throw new Error("Invalid AI output format");
    }

    // Generate filename
    const slug = slugify(title);
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    
    // Use timestamp to avoid duplicates if multiple posts same day
    const fileName = `${dateStr}-${slug}.md`;
    const filePath = path.join(POSTS_DIR, fileName);

    // Check for duplicates
    if (fs.existsSync(filePath)) {
      console.log(`⚠️ Duplicate post skipped: ${fileName}`);
      return null;
    }

    // Ensure posts directory exists
    if (!fs.existsSync(POSTS_DIR)) {
      fs.mkdirSync(POSTS_DIR, { recursive: true });
    }

    // Write markdown file
    const markdown = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${now.toISOString()}"
slug: "${slug}"
category: "${category}"
description: "${(description || '').replace(/"/g, '\\"')}"
keywords: "${(keywords || '').replace(/"/g, '\\"')}"
---

${content}`;

    fs.writeFileSync(filePath, markdown);
    console.log(`✅ News article generated: ${fileName}`);

    return {
      fileName,
      title,
      category: categoryLabel,
      slug
    };

  } catch (error) {
    console.error(`❌ Error generating article:`, error.message);
    return null;
  }
}

/**
 * Main function
 */
async function generateNews() {
  try {
    console.log("🚀 Starting news generation process...\n");

    // Detect trends
    const trends = await detectTrends();

    if (trends.length === 0) {
      console.log("ℹ️ No trending topics found. Skipping generation.");
      return;
    }

    // Filter and qualify trends
    const qualified = trends.filter(qualifyTrend).slice(0, 2); // Max 2 per run

    if (qualified.length === 0) {
      console.log("ℹ️ No qualified trending topics. Skipping generation.");
      return;
    }

    console.log(`\n📝 Generating ${qualified.length} news article(s)...\n`);

    // Generate articles
    const generated = [];
    for (const trend of qualified) {
      const article = await generateNewsArticle(trend);
      if (article) {
        generated.push(article);
      }
      // Small delay between generations
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    if (generated.length === 0) {
      console.log("ℹ️ No articles were generated.");
      return;
    }

    console.log(`\n✅ Successfully generated ${generated.length} news article(s):`);
    generated.forEach(art => {
      console.log(`   - ${art.title} (${art.category})`);
    });

  } catch (error) {
    console.error("❌ Fatal error:", error);
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('generateNews.mjs')) {
  generateNews().catch(console.error);
}
