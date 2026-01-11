import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const POSTS_DIR = path.join(process.cwd(), "posts");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing");
  process.exit(1);
}

// Simple topic pool (you can expand)
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

// Try different model names in order
const MODEL_NAMES = [
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro-latest", 
  "gemini-pro",
  "gemini-1.5-flash"
];

async function generatePost() {
  try {
    console.log("🧠 Generating post with Gemini Pro...");
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

    let res;
    let modelName;
    let lastError;
    
    // Try each model name until one works
    for (const model of MODEL_NAMES) {
      modelName = model;
      const apiUrl = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      
      console.log(`🔗 Trying model: ${model}`);
      
      try {
        res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: prompt }]
              }
            ]
          })
        });
        
        if (res.ok) {
          console.log(`✅ Successfully connected to ${model}`);
          break;
        } else {
          const errorData = await res.json().catch(() => ({ error: { message: await res.text() } }));
          lastError = errorData;
          console.log(`⚠️ Model ${model} failed: ${res.status}`);
          if (model !== MODEL_NAMES[MODEL_NAMES.length - 1]) {
            console.log(`   Trying next model...`);
          }
        }
      } catch (fetchError) {
        lastError = fetchError;
        console.log(`⚠️ Error with ${model}:`, fetchError.message);
        if (model !== MODEL_NAMES[MODEL_NAMES.length - 1]) {
          console.log(`   Trying next model...`);
        }
      }
    }

    if (!res || !res.ok) {
      console.error(`❌ All models failed. Last error:`, lastError);
      console.error(`\n💡 Tip: Check your API key and available models at:`);
      console.error(`   https://ai.google.dev/models`);
      process.exit(1);
    }

    const data = await res.json();

    if (!data.candidates || !data.candidates[0]) {
      console.error("❌ Gemini error:", JSON.stringify(data, null, 2));
      process.exit(1);
    }

    const text = data.candidates[0].content.parts[0].text;

    const title = text.match(/TITLE:(.*)/)?.[1]?.trim();
    const description = text.match(/META_DESCRIPTION:(.*)/)?.[1]?.trim();
    const keywords = text.match(/KEYWORDS:(.*)/)?.[1]?.trim();
    const content = text.split("CONTENT:")[1]?.trim();

    if (!title || !content) {
      console.error("❌ Invalid AI output");
      console.error("Raw output:", text.substring(0, 500));
      process.exit(1);
    }

    const slug = slugify(title);
    const date = new Date().toISOString().split("T")[0];

    const fileName = `${date}-${slug}.md`;
    const filePath = path.join(POSTS_DIR, fileName);

    if (!fs.existsSync(POSTS_DIR)) {
      fs.mkdirSync(POSTS_DIR, { recursive: true });
    }

    if (fs.existsSync(filePath)) {
      console.log("⚠️ Duplicate post skipped");
      return;
    }

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
    console.log(`📊 Used model: ${modelName}`);
  } catch (error) {
    console.error("❌ Error generating post:", error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

generatePost().catch(error => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});

