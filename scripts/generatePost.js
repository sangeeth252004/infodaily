import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import crypto from "crypto";

const POSTS_DIR = path.join(process.cwd(), "posts");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing");
  process.exit(1);
}

// Simple topic pool (you can expand)
const TOPICS = [
  "Latest technology trends in 2026",
  "How AI is changing daily life",
  "Best productivity tips for students",
  "Future of smartphones and gadgets",
  "How to improve focus and mental clarity"
];

// Pick random topic
const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];

// Slug generator
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function generatePost() {
  console.log("🧠 Generating post with Gemini Pro...");

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

  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" +
      GEMINI_API_KEY,
    {
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
    }
  );

  const data = await res.json();

  if (!data.candidates) {
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
    process.exit(1);
  }

  const slug = slugify(title);
  const date = new Date().toISOString().split("T")[0];

  const fileName = `${date}-${slug}.md`;
  const filePath = path.join(POSTS_DIR, fileName);

  if (!fs.existsSync(POSTS_DIR)) {
    fs.mkdirSync(POSTS_DIR);
  }

  if (fs.existsSync(filePath)) {
    console.log("⚠️ Duplicate post skipped");
    return;
  }

  const markdown = `---
title: "${title}"
description: "${description}"
date: "${date}"
keywords: "${keywords}"
slug: "${slug}"
---

${content}
`;

  fs.writeFileSync(filePath, markdown);
  console.log(`✅ Post generated: ${fileName}`);
}

generatePost();
