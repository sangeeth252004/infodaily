import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

const POSTS_DIR = path.join(process.cwd(), "posts");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing");
  process.exit(1);
}

// Initialize the Google AI Client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Simple topic pool
const TOPICS = [
  { topic: "Latest technology trends in 2026", category: "technology" },
  { topic: "How AI is changing daily life", category: "ai" },
  { topic: "Best productivity tips for students", category: "education" },
  { topic: "Future of smartphones and gadgets", category: "technology" },
  { topic: "How to improve focus and mental clarity", category: "health" }
];

// Pick random topic
const selected = TOPICS[Math.floor(Math.random() * TOPICS.length)];
const topic = selected.topic;
const category = selected.category;

// Slug generator
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Preferred models in order
const MODEL_NAMES = [
  "gemini-1.5-flash",
  "gemini-1.5-pro",
  "gemini-pro"
];

async function generatePost() {
  try {
    console.log("🧠 Generating post with Google AI SDK...");
    console.log(`📝 Topic: ${topic}`);

    const prompt = `
Write a high-quality, SEO-friendly blog article.

Rules:
- 1200–1500 words
- Informational, human-like tone
- No clickbait
- Google AdSense compliant
- No medical, gambling, adult, or illegal advice
- Use headings (H2, H3)
- Avoid repetition
- Original wording only

Topic:
"${topic}"

Return the output in the following format:

TITLE:
META_DESCRIPTION:
KEYWORDS:
CONTENT:
`;

    let textResponse;
    let usedModel = "";

    // Loop through models until one works
    for (const modelName of MODEL_NAMES) {
      console.log(`🔗 Trying model: ${modelName}`);
      try {
        // Get the model instance
        const model = genAI.getGenerativeModel({ model: modelName });

        // Generate content
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        textResponse = response.text();
        usedModel = modelName;
        
        console.log(`✅ Success with ${modelName}`);
        break; // Stop loop if successful

      } catch (error) {
        console.warn(`⚠️ Failed with ${modelName}: ${error.message}`);
        // Continue to next model in loop
      }
    }

    if (!textResponse) {
      throw new Error("All models failed to generate content.");
    }

    // Parse the output (Same logic as before)
    const title = textResponse.match(/TITLE:(.*)/)?.[1]?.trim();
    const description = textResponse.match(/META_DESCRIPTION:(.*)/)?.[1]?.trim();
    const keywords = textResponse.match(/KEYWORDS:(.*)/)?.[1]?.trim();
    const content = textResponse.split("CONTENT:")[1]?.trim();

    if (!title || !content) {
      console.error("❌ Invalid AI output format");
      console.error("Raw output start:", textResponse.substring(0, 200));
      process.exit(1);
    }

    const slug = slugify(title);
    const date = new Date().toISOString().split("T")[0];
    const fileName = `${date}-${slug}.md`;
    const filePath = path.join(POSTS_DIR, fileName);

    // Create dir if missing
    if (!fs.existsSync(POSTS_DIR)) {
      fs.mkdirSync(POSTS_DIR, { recursive: true });
    }

    if (fs.existsSync(filePath)) {
      console.log("⚠️ Duplicate post skipped");
      return;
    }

    // Construct Markdown
    const markdown = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${(description || "").replace(/"/g, '\\"')}"
date: "${date}"
keywords: "${(keywords || "").replace(/"/g, '\\"')}"
slug: "${slug}"
category: "${category}"
---

${content}
`;

    fs.writeFileSync(filePath, markdown);
    console.log(`✅ Post generated: ${fileName}`);
    console.log(`📊 Used model: ${usedModel}`);

  } catch (error) {
    console.error("❌ Fatal error:", error);
    process.exit(1);
  }
}

generatePost();