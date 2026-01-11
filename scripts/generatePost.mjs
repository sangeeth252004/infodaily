import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

const POSTS_DIR = path.join(process.cwd(), "posts");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const TOPICS = [
  { topic: "Latest technology trends in 2026", category: "technology" },
  { topic: "How AI is changing daily life", category: "ai" },
  { topic: "Best productivity tips for students", category: "education" },
  { topic: "Future of smartphones and gadgets", category: "technology" },
  { topic: "How to improve focus and mental clarity", category: "health" }
];

const selected = TOPICS[Math.floor(Math.random() * TOPICS.length)];

// Expanded Model List with Pinned Versions (More Reliable)
const MODEL_NAMES = [
  "gemini-1.5-flash-001", // Try pinned version first
  "gemini-1.5-flash",     // Try alias
  "gemini-1.5-pro-001",   
  "gemini-1.5-pro",
  "gemini-1.0-pro"        // Fallback to 1.0
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

async function debugAvailableModels() {
  try {
    console.log("🔍 Debugging: Fetching available models for this API key...");
    // Using a random model just to get access to the listModels method
    // (The SDK requires us to get the list from the client or manager usually, 
    // but in v0.x SDKs sometimes it's different. We'll try a direct listing if possible
    // or just rely on the error message which often suggests ListModels).
    // Note: The current node SDK exposes listModels on the genAI instance in some versions,
    // or via the ModelManager. 
    
    // Attempting to just proceed. If this fails, the error log below will be critical.
  } catch (e) {
    console.log("Could not list models automatically.");
  }
}

async function generatePost() {
  try {
    console.log("🧠 Generating post with Google AI SDK...");
    console.log(`📝 Topic: ${selected.topic}`);

    const prompt = `
      Write a high-quality, SEO-friendly blog article.
      Topic: "${selected.topic}"
      Return format:
      TITLE: ...
      META_DESCRIPTION: ...
      KEYWORDS: ...
      CONTENT: ...
    `;

    let textResponse;
    let usedModel = "";

    // Loop through models
    for (const modelName of MODEL_NAMES) {
      console.log(`🔗 Trying model: ${modelName}`);
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        textResponse = response.text();
        usedModel = modelName;
        console.log(`✅ Success with ${modelName}`);
        break;
      } catch (error) {
        // Detailed error logging to help debug 404s
        console.warn(`⚠️ Failed with ${modelName}: ${error.message.split(' ')[0]}... (Status: ${error.status || 'Unknown'})`);
      }
    }

    if (!textResponse) {
      console.error("\n❌ FATAL: All models failed.");
      console.error("This is likely an API Key permission or Region issue.");
      console.error("Try running this locally to verify your API Key works outside of GitHub Actions.");
      process.exit(1);
    }

    // Parsing Logic
    const title = textResponse.match(/TITLE:(.*)/)?.[1]?.trim();
    const content = textResponse.split("CONTENT:")[1]?.trim();

    if (!title || !content) {
      throw new Error("Invalid AI output format");
    }

    const slug = slugify(title);
    const date = new Date().toISOString().split("T")[0];
    const fileName = `${date}-${slug}.md`;
    const filePath = path.join(POSTS_DIR, fileName);

    if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });
    
    fs.writeFileSync(filePath, `---
title: "${title.replace(/"/g, '\\"')}"
date: "${date}"
slug: "${slug}"
category: "${selected.category}"
---

${content}`);

    console.log(`✅ Post generated: ${fileName}`);

  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

generatePost();