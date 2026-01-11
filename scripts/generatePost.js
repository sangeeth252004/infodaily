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

async function generatePost() {
  try {
    console.log("🧠 Generating post with Gemini Pro...");
    console.log(`📝 Topic: ${topic}`);

  // Improved prompt for human-like, natural-sounding content
  // This prompt emphasizes natural variation, conversational tone, and avoiding
  // common AI writing patterns (robotic transitions, perfect structure, keyword stuffing)
  const prompt = `
You are an experienced blog writer creating an informative, engaging article. Write naturally, as if you're having a conversation with an interested reader.

WRITING STYLE:
- Write like a human blogger who knows their topic well, not an AI
- Vary sentence length naturally (mix short punchy sentences with longer explanatory ones)
- Use a light conversational tone while staying professional and informative
- Occasionally include rhetorical questions where appropriate (e.g., "But what does this actually mean for everyday users?")
- Include subtle, generic real-world examples when they help illustrate points (no personal anecdotes or specific claims)
- Sound like someone sharing knowledge, not a marketer or textbook

WHAT TO AVOID (these sound too AI-generated):
- Overly perfect structure with identical paragraph lengths
- Robotic transition phrases like "In conclusion", "Furthermore", "Moreover", "Additionally", "It is important to note"
- Repeating keywords unnaturally throughout the text
- Generic AI-style introductions ("In today's world", "As we navigate", "In an era of")
- Forced summaries at the end - let the article end naturally
- Lists that are too uniform or perfectly structured

STRUCTURE GUIDELINES:
- Start with a strong, specific introduction that hooks the reader naturally (avoid generic openings)
- Use H2 and H3 headings, but don't make them too uniform - vary the style occasionally
- Keep paragraphs to 2-4 lines maximum for readability
- Mix bullet points with prose paragraphs where it feels natural
- End with a natural conclusion, not a summary headline or forced wrap-up
- Allow some imperfections - real writing isn't perfectly structured

CONTENT REQUIREMENTS:
- 1200-1500 words total
- Informational and helpful tone only
- No medical diagnoses, financial guarantees, or health promises
- No exaggerated claims or superlatives
- Neutral, balanced language suitable for Google AdSense
- No medical, gambling, adult, or illegal advice
- Focus on providing genuine value and insights

TOPIC:
"${topic}"

Return the output in this exact format:

TITLE:
META_DESCRIPTION:
KEYWORDS:
CONTENT:

Remember: Write like a human expert sharing knowledge, not an AI generating content.
`;

  // Try different model names (gemini-1.5-flash-latest, gemini-pro, etc.)
  // Common model names: gemini-1.5-flash-latest, gemini-1.5-pro-latest, gemini-pro
  const modelName = "gemini-1.5-flash-latest";
  const apiUrl = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
  
  console.log(`🔗 Using model: ${modelName}`);
  
  const res = await fetch(apiUrl, {
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

  if (!res.ok) {
    console.error(`❌ API error: ${res.status} ${res.statusText}`);
    const errorText = await res.text();
    console.error("Response:", errorText);
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
  } catch (error) {
    console.error("❌ Error generating post:", error.message);
    process.exit(1);
  }
}

generatePost().catch(error => {
  console.error("❌ Fatal error:", error);
  process.exit(1);
});
