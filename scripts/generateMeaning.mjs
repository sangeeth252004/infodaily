/**
 * Meaning / Definition Generation Script
 * SAFE YAML + Gemini Model Rotation + Anti-Duplicate
 */

import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

const MEANING_DIR = path.join(process.cwd(), "meaning");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

/* ---------------- CONFIG ---------------- */

const MEANINGS_PER_RUN = parseInt(process.env.MEANING_PER_RUN || "5", 10);
const MAX_DAILY = parseInt(process.env.MEANING_DAILY_LIMIT || "5", 10);
const DELAY_BETWEEN_GENERATIONS = 90000; // 90s

/* 🔁 MODEL ROTATION (FREE-TIER SAFE) */
const MODEL_ROTATION = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
  "gemini-3-flash"
];

/* ---------------- SAFE CATEGORIES ---------------- */

const TERM_CATEGORIES = [
  "technology terms",
  "AI and machine learning concepts",
  "software development terms",
  "internet and web terminology",
  "business and startup terms",
  "education-related terms",
  "digital marketing terms",
  "cloud computing terms",
  "cybersecurity terms",
  "data science terms"
];

const AVOID_TOPICS = ["medical", "legal", "adult", "political", "gambling"];

/* ---------------- HELPERS ---------------- */

const sleep = ms => new Promise(r => setTimeout(r, ms));

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/* 🔒 YAML-SAFE SANITIZER (CRITICAL FIX) */
function yamlSafe(str = "") {
  return str
    .replace(/\r?\n+/g, " ")
    .replace(/\0/g, "")
    .trim();
}

/* 🔁 GEMINI MODEL ROTATION */
async function generateWithModelRotation(prompt) {
  let lastError = null;

  for (const modelName of MODEL_ROTATION) {
    try {
      console.log(`🔄 Using model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      lastError = err;
      const msg = err.message || String(err);

      if (
        msg.includes("429") ||
        msg.includes("quota") ||
        msg.includes("Too Many Requests")
      ) {
        console.warn(`⚠️ Quota hit on ${modelName}, rotating...`);
        await sleep(2000);
        continue;
      }
      throw err;
    }
  }

  throw lastError || new Error("All Gemini models exhausted");
}

/* ---------------- DUPLICATE CHECKS ---------------- */

function getExistingTerms() {
  if (!fs.existsSync(MEANING_DIR)) return [];

  return fs
    .readdirSync(MEANING_DIR)
    .filter(f => f.endsWith(".md"))
    .map(file => {
      const content = fs.readFileSync(path.join(MEANING_DIR, file), "utf8");
      const match = content.match(/term:\s*["']?([^"'\n]+)["']?/i);
      return match ? match[1].toLowerCase().trim() : null;
    })
    .filter(Boolean);
}

function isDuplicateTerm(newTerm, existingTerms) {
  const n = newTerm.toLowerCase();
  if (existingTerms.includes(n)) return true;

  const nw = new Set(n.split(/\s+/));
  return existingTerms.some(e => {
    const ew = new Set(e.split(/\s+/));
    const overlap = [...nw].filter(w => ew.has(w)).length;
    return overlap / Math.max(nw.size, 1) > 0.8;
  });
}

function checkDailyLimit() {
  if (!fs.existsSync(MEANING_DIR)) return true;
  const today = new Date().toISOString().split("T")[0];
  return fs.readdirSync(MEANING_DIR).filter(f => f.startsWith(today)).length < MAX_DAILY;
}

/* ---------------- TERM GENERATION ---------------- */

async function generateTerm(existingTerms, attempt = 1) {
  if (attempt > 5) throw new Error("Failed to generate unique term");

  const category = TERM_CATEGORIES[Math.floor(Math.random() * TERM_CATEGORIES.length)];

  const prompt = `
Generate ONE real dictionary-style term from: "${category}"

Rules:
- 1–4 words
- Safe for AdSense
- Not medical, legal, political, adult
- Something people actually search
- Output ONLY the term
`;

  let term = (await generateWithModelRotation(prompt))
    .replace(/^["']|["']$/g, "")
    .trim();

  if (
    term.length < 2 ||
    term.length > 50 ||
    AVOID_TOPICS.some(t => term.toLowerCase().includes(t)) ||
    isDuplicateTerm(term, existingTerms)
  ) {
    return generateTerm(existingTerms, attempt + 1);
  }

  return term;
}

/* ---------------- MEANING GENERATION ---------------- */

async function generateMeaningEntry(term, existingTerms) {
  console.log(`📝 Generating meaning for: ${term}`);

  const prompt = `
Define the term clearly and professionally.

Term: ${term}

Format EXACTLY as:

DEFINITION:
(one sentence)

DETAILED_EXPLANATION:
(paragraphs + example + context)

KEYWORDS:
(comma separated)
`;

  const text = await generateWithModelRotation(prompt);

  const def = text.match(/DEFINITION:\s*(.*?)(?=\nDETAILED_EXPLANATION:)/s)?.[1]?.trim();
  const body = text.match(/DETAILED_EXPLANATION:\s*(.*?)(?=\nKEYWORDS:)/s)?.[1]?.trim();
  const keywords = text.match(/KEYWORDS:\s*(.*)/)?.[1]?.trim();

  if (!def || !body) return null;

  const slug = slugify(term);
  const date = new Date().toISOString();
  const fileName = `${date.split("T")[0]}-${slug}.md`;

  if (!fs.existsSync(MEANING_DIR)) {
    fs.mkdirSync(MEANING_DIR, { recursive: true });
  }

  /* ✅ YAML-SAFE FRONTMATTER (NO QUOTE BREAKS) */
  const markdown = `---
term: "${yamlSafe(term)}"
definition: |
  ${yamlSafe(def)}
date: "${date}"
slug: "${slug}"
keywords: "${yamlSafe(keywords || "")}"
---

${body}
`;

  fs.writeFileSync(path.join(MEANING_DIR, fileName), markdown);
  return term;
}

/* ---------------- MAIN ---------------- */

async function generateMeanings() {
  console.log("🚀 Starting meaning generation\n");

  if (!checkDailyLimit()) {
    console.log("⚠️ Daily limit reached");
    return;
  }

  const existingTerms = getExistingTerms();
  const generated = [];

  for (let i = 0; i < MEANINGS_PER_RUN; i++) {
    if (!checkDailyLimit()) break;

    try {
      const term = await generateTerm(existingTerms);
      const result = await generateMeaningEntry(term, existingTerms);

      if (result) {
        generated.push(result);
        existingTerms.push(term.toLowerCase());
        console.log(`✅ Generated: ${term}`);
      }

      if (i < MEANINGS_PER_RUN - 1) {
        await sleep(DELAY_BETWEEN_GENERATIONS);
      }
    } catch (e) {
      console.error("❌ Error:", e.message);
    }
  }

  console.log(`\n📊 Done. Generated ${generated.length} definitions`);
}

if (process.argv[1]?.endsWith("generateMeaning.mjs")) {
  generateMeanings();
}
