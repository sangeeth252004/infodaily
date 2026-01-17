/**
 * VS / Comparison Generation Script
 * Generates original comparison articles using Gemini AI
 * Includes anti-duplicate logic and quality controls
 */

import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

const VS_DIR = path.join(process.cwd(), "vs");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Configuration
const COMPARISONS_PER_RUN = parseInt(process.env.VS_PER_RUN || "3", 10); // Default: 3 comparisons per run
const MAX_DAILY = parseInt(process.env.VS_DAILY_LIMIT || "5", 10); // Max 5 per day
const DELAY_BETWEEN_GENERATIONS = 120000; // 120 seconds in milliseconds

// Model rotation for better reliability
const MODEL_ROTATION = [
  "gemini-2.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
  "gemini-3-flash"
];

// Safe comparison categories
const COMPARISON_CATEGORIES = [
  { type: "programming languages", examples: ["Python", "Java", "JavaScript", "C++", "Go", "Rust"] },
  { type: "software tools", examples: ["VS Code", "IntelliJ", "Sublime", "Atom", "Notepad++"] },
  { type: "AI models", examples: ["ChatGPT", "Gemini", "Claude", "Copilot", "Bard"] },
  { type: "frameworks", examples: ["React", "Vue", "Angular", "Next.js", "Svelte"] },
  { type: "online services", examples: ["GitHub", "GitLab", "Bitbucket", "AWS", "Azure"] },
  { type: "education tools", examples: ["Coursera", "Udemy", "edX", "Khan Academy"] },
  { type: "databases", examples: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"] },
  { type: "cloud platforms", examples: ["AWS", "Google Cloud", "Azure", "DigitalOcean"] },
];

// Topics to avoid
const AVOID_TOPICS = [
  "medical",
  "legal",
  "adult content",
  "political",
  "gambling",
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/**
 * Sleep utility
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate content with model rotation
 * Tries each model in order until one succeeds
 */
async function generateWithModelRotation(prompt) {
  let lastError = null;

  for (const modelName of MODEL_ROTATION) {
    try {
      console.log(`🔄 Trying model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(`✅ Success with ${modelName}`);
      return text;
    } catch (err) {
      lastError = err;
      const errorMsg = err.message || String(err);
      
      // Check for rate limiting or quota errors
      if (
        errorMsg.includes("429") ||
        errorMsg.includes("quota") ||
        errorMsg.includes("Too Many Requests") ||
        errorMsg.includes("RESOURCE_EXHAUSTED")
      ) {
        console.warn(`⚠️ Rate limit/quota hit on ${modelName}, trying next model...`);
        await sleep(2000); // Wait before trying next model
        continue;
      }
      
      // For other errors, log and try next model
      console.warn(`⚠️ Error with ${modelName}: ${errorMsg.substring(0, 100)}`);
      await sleep(1000);
      continue;
    }
  }

  throw lastError || new Error("All Gemini models exhausted");
}

/**
 * Get all existing comparisons for duplicate checking
 */
function getExistingComparisons() {
  if (!fs.existsSync(VS_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(VS_DIR);
  const comparisons = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith('.md')) continue;
    
    try {
      const fullPath = path.join(VS_DIR, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const frontmatterMatch = fileContents.match(/^---\s*\n([\s\S]*?)\n---/);
      
      if (frontmatterMatch) {
        const itemAMatch = frontmatterMatch[1].match(/itemA:\s*["']?([^"'\n]+)["']?/i);
        const itemBMatch = frontmatterMatch[1].match(/itemB:\s*["']?([^"'\n]+)["']?/i);
        if (itemAMatch && itemBMatch) {
          const itemA = itemAMatch[1].toLowerCase().trim();
          const itemB = itemBMatch[1].toLowerCase().trim();
          // Store both directions (A vs B and B vs A are the same)
          comparisons.push(`${itemA}-vs-${itemB}`);
          comparisons.push(`${itemB}-vs-${itemA}`);
        }
      }
    } catch (error) {
      // Skip files that can't be read
      continue;
    }
  }

  return comparisons;
}

/**
 * Check if a comparison is too similar to existing comparisons
 */
function isDuplicateComparison(itemA, itemB, existingComparisons) {
  const normalizedA = itemA.toLowerCase().trim();
  const normalizedB = itemB.toLowerCase().trim();
  
  const comparisonKey1 = `${normalizedA}-vs-${normalizedB}`;
  const comparisonKey2 = `${normalizedB}-vs-${normalizedA}`;
  
  // Check if either direction exists
  if (existingComparisons.includes(comparisonKey1) || existingComparisons.includes(comparisonKey2)) {
    return true;
  }

  // Check for high similarity in item names
  for (const existing of existingComparisons) {
    const [existingA, , existingB] = existing.split('-vs-');
    if (existingA && existingB) {
      // Check if items are very similar (80% word overlap)
      const aWords = new Set(normalizedA.split(/\s+/).filter(w => w.length > 2));
      const bWords = new Set(normalizedB.split(/\s+/).filter(w => w.length > 2));
      const existingAWords = new Set(existingA.split(/\s+/).filter(w => w.length > 2));
      const existingBWords = new Set(existingB.split(/\s+/).filter(w => w.length > 2));
      
      const aSimilarity = aWords.size > 0 ? 
        new Set([...aWords].filter(x => existingAWords.has(x))).size / new Set([...aWords, ...existingAWords]).size : 0;
      const bSimilarity = bWords.size > 0 ? 
        new Set([...bWords].filter(x => existingBWords.has(x))).size / new Set([...bWords, ...existingBWords]).size : 0;
      
      if (aSimilarity > 0.8 && bSimilarity > 0.8) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Check daily limit
 */
function checkDailyLimit() {
  if (!fs.existsSync(VS_DIR)) {
    return true;
  }

  const today = new Date().toISOString().split('T')[0];
  const fileNames = fs.readdirSync(VS_DIR);
  const todayCount = fileNames.filter(name => name.startsWith(today)).length;

  return todayCount < MAX_DAILY;
}

/**
 * Generate a unique comparison pair
 */
async function generateComparisonPair(existingComparisons, attempt = 1) {
  if (attempt > 5) {
    throw new Error("Failed to generate unique comparison after 5 attempts");
  }

  const category = COMPARISON_CATEGORIES[Math.floor(Math.random() * COMPARISON_CATEGORIES.length)];
  
  const prompt = `Generate a single, specific comparison pair from the category: "${category.type}"

REQUIREMENTS:
- Must be two real, commonly compared items from: ${category.examples.join(', ')}
- Must be educational and factual
- Must be safe for AdSense (no medical, legal, political, or adult content)
- Must be items that people actually compare
- Should be specific and relevant

EXAMPLES OF GOOD COMPARISONS:
- "Python vs Java"
- "React vs Vue"
- "ChatGPT vs Gemini"
- "MySQL vs PostgreSQL"
- "AWS vs Azure"

EXAMPLES OF BAD COMPARISONS (TOO GENERIC OR UNSAFE):
- "Software vs Hardware" (too generic)
- "Medicine A vs Medicine B" (medical - avoid)
- "Law vs Justice" (legal - avoid)

Generate ONE comparison pair in the format: "ItemA vs ItemB"

Return ONLY the comparison in that format, nothing else.`;

  try {
    let comparisonText = (await generateWithModelRotation(prompt)).trim();

    // Clean the comparison text
    comparisonText = comparisonText
      .replace(/^["']|["']$/g, '') // Remove quotes
      .replace(/^Comparison:\s*/i, '') // Remove "Comparison:" prefix if present
      .trim();

    // Parse "ItemA vs ItemB" format
    const vsMatch = comparisonText.match(/(.+?)\s+vs\s+(.+)/i);
    if (!vsMatch) {
      console.log(`⚠️ Invalid comparison format: "${comparisonText}", retrying...`);
      return await generateComparisonPair(existingComparisons, attempt + 1);
    }

    const itemA = vsMatch[1].trim();
    const itemB = vsMatch[2].trim();

    // Validate items
    if (itemA.length < 2 || itemA.length > 50 || itemB.length < 2 || itemB.length > 50) {
      console.log(`⚠️ Item length invalid, retrying...`);
      return await generateComparisonPair(existingComparisons, attempt + 1);
    }

    // Check for avoided topics
    const lowerA = itemA.toLowerCase();
    const lowerB = itemB.toLowerCase();
    for (const avoidTopic of AVOID_TOPICS) {
      if (lowerA.includes(avoidTopic) || lowerB.includes(avoidTopic)) {
        console.log(`⚠️ Comparison contains avoided topic: "${avoidTopic}", retrying...`);
        return await generateComparisonPair(existingComparisons, attempt + 1);
      }
    }

    // Check for duplicates
    if (isDuplicateComparison(itemA, itemB, existingComparisons)) {
      console.log(`⚠️ Duplicate comparison detected: "${itemA} vs ${itemB}", retrying...`);
      return await generateComparisonPair(existingComparisons, attempt + 1);
    }

    return { itemA, itemB };

  } catch (error) {
    const errorMsg = error.message || String(error);
    console.error(`❌ Error generating comparison:`, errorMsg);
    
    if (attempt < 5) {
      await sleep(2000 * attempt);
      return await generateComparisonPair(existingComparisons, attempt + 1);
    }
    throw error;
  }
}

/**
 * Generate a comparison entry
 */
async function generateComparisonEntry(itemA, itemB, existingComparisons) {
  try {
    const title = `${itemA} vs ${itemB}`;
    console.log(`📝 Generating comparison: ${title}...`);

    const prompt = `You are a neutral technical writer comparing two concepts.
Write factual, balanced, original comparisons.
Do not favor either side.
Avoid repeated phrasing across comparisons.
Do not mention AI or yourself.

Compare the following two items clearly and objectively:

Item A: ${itemA}
Item B: ${itemB}

Instructions:
1. Start with a short neutral overview
2. Explain key differences clearly
3. Compare features in simple language
4. Mention advantages and limitations of each
5. Explain which is better for different use cases
6. Avoid conclusions like 'In summary'
7. Maintain a professional, unbiased tone

Return the output in this exact format:

SUMMARY:
[Short neutral overview paragraph - max 160 characters]

KEY_DIFFERENCES:
[Key differences section in markdown format]

FEATURE_COMPARISON:
[Feature-by-feature comparison in markdown format]

ADVANTAGES_AND_DISADVANTAGES:
[Advantages and disadvantages of each in markdown format]

WHICH_TO_CHOOSE:
[Which one to choose for different use cases in markdown format]

KEYWORDS:
[comma-separated keywords for SEO]`;

    const textResponse = await generateWithModelRotation(prompt);

    // Parse response
    const summaryMatch = textResponse.match(/SUMMARY:\s*(.*?)(?=\nKEY_DIFFERENCES:)/s);
    const keyDifferencesMatch = textResponse.match(/KEY_DIFFERENCES:\s*(.*?)(?=\nFEATURE_COMPARISON:)/s);
    const featureComparisonMatch = textResponse.match(/FEATURE_COMPARISON:\s*(.*?)(?=\nADVANTAGES_AND_DISADVANTAGES:)/s);
    const advantagesMatch = textResponse.match(/ADVANTAGES_AND_DISADVANTAGES:\s*(.*?)(?=\nWHICH_TO_CHOOSE:)/s);
    const whichToChooseMatch = textResponse.match(/WHICH_TO_CHOOSE:\s*(.*?)(?=\nKEYWORDS:)/s);
    const keywordsMatch = textResponse.match(/KEYWORDS:\s*(.*?)(?:\n|$)/s);

    const summary = summaryMatch?.[1]?.trim() || '';
    const keyDifferences = keyDifferencesMatch?.[1]?.trim() || '';
    const featureComparison = featureComparisonMatch?.[1]?.trim() || '';
    const advantages = advantagesMatch?.[1]?.trim() || '';
    const whichToChoose = whichToChooseMatch?.[1]?.trim() || '';
    const keywords = keywordsMatch?.[1]?.trim() || '';

    if (!summary || !keyDifferences) {
      throw new Error("Invalid AI output format - missing required sections");
    }

    // Combine all sections into content
    const content = `## Overview

${summary}

## Key Differences

${keyDifferences}

## Feature-by-Feature Comparison

${featureComparison}

## Advantages and Disadvantages

${advantages}

## Which One Should You Choose?

${whichToChoose}`;

    // Final duplicate check
    if (isDuplicateComparison(itemA, itemB, existingComparisons)) {
      console.log(`⚠️ Duplicate comparison detected after generation: "${title}"`);
      return null;
    }

    const slug = slugify(title);
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    
    const fileName = `${dateStr}-${slug}.md`;
    const filePath = path.join(VS_DIR, fileName);

    if (fs.existsSync(filePath)) {
      console.log(`⚠️ Duplicate file skipped: ${fileName}`);
      return null;
    }

    if (!fs.existsSync(VS_DIR)) {
      fs.mkdirSync(VS_DIR, { recursive: true });
    }

    const markdown = `---
title: "${title.replace(/"/g, '\\"')}"
itemA: "${itemA.replace(/"/g, '\\"')}"
itemB: "${itemB.replace(/"/g, '\\"')}"
summary: "${summary.replace(/"/g, '\\"')}"
date: "${now.toISOString()}"
slug: "${slug}"
keywords: "${keywords.replace(/"/g, '\\"')}"
---

${content}`;

    fs.writeFileSync(filePath, markdown);
    console.log(`✅ Comparison generated: ${fileName}`);

    return {
      fileName,
      title,
      slug,
      itemA,
      itemB
    };

  } catch (error) {
    console.error(`❌ Error generating comparison:`, error.message);
    return null;
  }
}

/**
 * Main function
 */
async function generateComparisons() {
  try {
    console.log("🚀 Starting comparison generation process...\n");
    
    // Check daily limit
    if (!checkDailyLimit()) {
      console.log(`⚠️ Daily limit reached (${MAX_DAILY} comparisons per day). Skipping generation.`);
      return;
    }

    console.log(`📊 Target: ${COMPARISONS_PER_RUN} comparison(s) per run\n`);

    // Get existing comparisons for duplicate checking
    const existingComparisons = getExistingComparisons();
    console.log(`📋 Found ${existingComparisons.length / 2} existing comparisons\n`);

    const generated = [];
    const skipped = [];

    for (let i = 0; i < COMPARISONS_PER_RUN; i++) {
      try {
        // Check daily limit again before each generation
        if (!checkDailyLimit()) {
          console.log(`\n⚠️ Daily limit reached. Stopping generation.`);
          break;
        }

        console.log(`\n[${i + 1}/${COMPARISONS_PER_RUN}] Generating comparison...`);

        // Generate a unique comparison pair
        const { itemA, itemB } = await generateComparisonPair(existingComparisons);
        console.log(`📌 Comparison: ${itemA} vs ${itemB}`);

        // Generate the comparison entry
        const comparisonEntry = await generateComparisonEntry(itemA, itemB, existingComparisons);
        
        if (comparisonEntry) {
          generated.push(comparisonEntry);
          // Update existing comparisons (both directions)
          existingComparisons.push(`${itemA.toLowerCase()}-vs-${itemB.toLowerCase()}`);
          existingComparisons.push(`${itemB.toLowerCase()}-vs-${itemA.toLowerCase()}`);
          console.log(`✅ Successfully generated: ${comparisonEntry.title}`);
        } else {
          skipped.push(`${itemA} vs ${itemB}`);
          console.log(`⚠️ Skipped: ${itemA} vs ${itemB}`);
        }

        // Wait 120 seconds between generations (except after the last one)
        if (i < COMPARISONS_PER_RUN - 1) {
          console.log(`⏳ Waiting ${DELAY_BETWEEN_GENERATIONS / 1000}s before next generation...`);
          await sleep(DELAY_BETWEEN_GENERATIONS);
        }

      } catch (error) {
        console.error(`❌ Error in iteration ${i + 1}:`, error.message);
        skipped.push(`Iteration ${i + 1}`);
        // Continue to next iteration instead of crashing
      }
    }

    console.log(`\n\n📊 Generation Summary:`);
    console.log(`✅ Generated: ${generated.length} comparisons`);
    console.log(`⚠️ Skipped: ${skipped.length} comparisons`);

    if (generated.length > 0) {
      console.log(`\n✅ Successfully generated ${generated.length} comparison(s):`);
      generated.forEach(comp => {
        console.log(`   - ${comp.title}`);
      });
    }

    if (skipped.length > 0) {
      console.log(`\n⚠️ Skipped ${skipped.length} comparison(s):`);
      skipped.forEach(item => {
        console.log(`   - ${item}`);
      });
    }

    if (generated.length === 0) {
      console.log("\nℹ️ No comparisons were generated.");
    }

  } catch (error) {
    console.error("❌ Fatal error:", error);
    // Don't exit with error code - allow workflow to continue
    process.exit(0);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('generateVs.mjs')) {
  generateComparisons().catch(console.error);
}

