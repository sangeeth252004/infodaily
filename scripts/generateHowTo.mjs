/**
 * How-To Generation Script
 * Generates original How-To / Error Fix articles using Gemini AI
 * Includes strong anti-duplicate logic and quality controls
 */

import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

const HOWTO_DIR = path.join(process.cwd(), "how-to");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Configuration
const ARTICLES_PER_RUN = parseInt(process.env.HOWTO_DAILY_LIMIT || "1", 10); // Default: 1 article per run
const MODEL_NAMES = [
  "gemini-2.5-flash",      // Try the newest first
  "gemini-2.0-flash",      // Standard stable
  "gemini-2.0-flash-lite", // Fast backup
  "gemini-2.0-pro"         // High reasoning backup
];

// How-To topic categories (focused on errors and troubleshooting)
const TOPIC_CATEGORIES = [
  "software errors",
  "application issues",
  "operating system problems",
  "developer errors",
  "device troubleshooting",
  "browser issues",
  "network problems",
  "configuration errors",
  "installation problems",
  "performance issues"
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/**
 * Sleep utility with exponential backoff
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retry API call with exponential backoff
 */
async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 2000) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const isLastAttempt = attempt === maxRetries - 1;
      const errorMsg = error.message || String(error);
      
      // Check for rate limiting or quota errors
      const isRateLimit = errorMsg.includes('429') || 
                         errorMsg.includes('quota') || 
                         errorMsg.includes('rate limit') ||
                         errorMsg.includes('RESOURCE_EXHAUSTED');
      
      if (isLastAttempt) {
        throw error;
      }
      
      // Exponential backoff: 2s, 4s, 8s, etc.
      const delay = baseDelay * Math.pow(2, attempt);
      
      if (isRateLimit) {
        console.log(`⏳ Rate limit detected, waiting ${delay / 1000}s before retry...`);
        // Longer wait for rate limits
        await sleep(delay * 2);
      } else {
        console.log(`⏳ Retrying in ${delay / 1000}s... (attempt ${attempt + 1}/${maxRetries})`);
        await sleep(delay);
      }
    }
  }
}

/**
 * Get all existing how-to titles for duplicate checking
 */
function getExistingTitles() {
  if (!fs.existsSync(HOWTO_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(HOWTO_DIR);
  const titles = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith('.md')) continue;
    
    try {
      const fullPath = path.join(HOWTO_DIR, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const frontmatterMatch = fileContents.match(/^---\s*\n([\s\S]*?)\n---/);
      
      if (frontmatterMatch) {
        const titleMatch = frontmatterMatch[1].match(/title:\s*["']?([^"'\n]+)["']?/i);
        if (titleMatch) {
          titles.push(titleMatch[1].toLowerCase().trim());
        }
      }
    } catch (error) {
      // Skip files that can't be read
      continue;
    }
  }

  return titles;
}

/**
 * Check if a title is too similar to existing titles
 */
function isDuplicateTitle(newTitle, existingTitles) {
  const normalizedNew = newTitle.toLowerCase().trim();
  
  // Exact match
  if (existingTitles.includes(normalizedNew)) {
    return true;
  }

  // Check for high similarity (more than 80% word overlap)
  const newWords = new Set(normalizedNew.split(/\s+/).filter(w => w.length > 3));
  
  for (const existingTitle of existingTitles) {
    const existingWords = new Set(existingTitle.split(/\s+/).filter(w => w.length > 3));
    const intersection = new Set([...newWords].filter(x => existingWords.has(x)));
    const union = new Set([...newWords, ...existingWords]);
    
    if (union.size > 0) {
      const similarity = intersection.size / union.size;
      if (similarity > 0.8) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Generate a unique how-to topic
 */
async function generateTopic(existingTitles, attempt = 1) {
  if (attempt > 5) {
    throw new Error("Failed to generate unique topic after 5 attempts");
  }

  const category = TOPIC_CATEGORIES[Math.floor(Math.random() * TOPIC_CATEGORIES.length)];
  const toneVariations = [
    "Write a helpful, clear guide",
    "Create a step-by-step troubleshooting guide",
    "Write a practical error-fixing tutorial",
    "Create an easy-to-follow solution guide",
    "Write a detailed problem-solving guide"
  ];
  const tone = toneVariations[Math.floor(Math.random() * toneVariations.length)];

  const prompt = `You are an expert technical writer creating original How-To / Error Fix guides.

${tone} for a specific, real-world technical problem in the category: "${category}"

REQUIREMENTS:
- Must be a SPECIFIC, ACTIONABLE problem (not generic)
- Must be a real error or issue people actually encounter
- Must have a clear, step-by-step solution
- Title should be specific (e.g., "How to Fix 'Module Not Found' Error in Python" not "How to Fix Errors")
- Avoid vague topics like "How to Use Software" or "How to Fix Problems"
- Focus on actual errors, bugs, or troubleshooting scenarios

EXAMPLES OF GOOD TOPICS:
- "How to Fix 'ERR_CONNECTION_REFUSED' in Chrome"
- "How to Resolve 'Permission Denied' Error in Linux"
- "How to Fix 'npm install' Fails with EACCES Error"
- "How to Resolve 'Out of Memory' Error in Android Studio"
- "How to Fix 'Certificate Error' in Windows 10"

EXAMPLES OF BAD TOPICS (TOO GENERIC):
- "How to Use Python"
- "How to Fix Errors"
- "How to Troubleshoot Problems"
- "How to Use Software"

Generate ONE specific, actionable how-to topic title that fits the category "${category}".

Return ONLY the title, nothing else.`;

  try {
    let textResponse;
    let usedModel = "";

    // Try models in order with retry logic
    for (const modelName of MODEL_NAMES) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        
        // Retry with backoff for each model
        const result = await retryWithBackoff(async () => {
          return await model.generateContent(prompt);
        }, 2, 1000); // 2 retries, 1s base delay
        
        const response = await result.response;
        textResponse = response.text().trim();
        usedModel = modelName;
        break;
      } catch (error) {
        const errorMsg = error.message || String(error);
        const shortMsg = errorMsg.length > 100 ? errorMsg.substring(0, 100) + '...' : errorMsg;
        console.warn(`⚠️ Failed with ${modelName}: ${shortMsg}`);
        
        // If rate limited, wait longer before trying next model
        if (errorMsg.includes('429') || errorMsg.includes('quota') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
          console.log(`⏳ Rate limit detected, waiting 5s before trying next model...`);
          await sleep(5000);
        }
      }
    }

    if (!textResponse) {
      throw new Error("All AI models failed");
    }

    // Clean the title
    let title = textResponse
      .replace(/^["']|["']$/g, '') // Remove quotes
      .replace(/^Title:\s*/i, '') // Remove "Title:" prefix if present
      .trim();

    // Validate title
    if (title.length < 20 || title.length > 120) {
      console.log(`⚠️ Title length invalid (${title.length} chars), retrying...`);
      return await generateTopic(existingTitles, attempt + 1);
    }

    // Check for generic patterns
    const genericPatterns = [
      /^how to (use|fix|resolve|troubleshoot|solve)\s+(a|an|the|some|any|all|every|general|common|basic|simple)/i,
      /^how to (use|fix|resolve|troubleshoot|solve)\s+(software|program|application|tool|system|device|computer|phone)/i,
      /^how to (use|fix|resolve|troubleshoot|solve)\s+(errors?|problems?|issues?|bugs?|glitches?)/i,
    ];

    for (const pattern of genericPatterns) {
      if (pattern.test(title)) {
        console.log(`⚠️ Title too generic: "${title}", retrying...`);
        return await generateTopic(existingTitles, attempt + 1);
      }
    }

    // Check for duplicates
    if (isDuplicateTitle(title, existingTitles)) {
      console.log(`⚠️ Duplicate title detected: "${title}", retrying...`);
      return await generateTopic(existingTitles, attempt + 1);
    }

    return title;

  } catch (error) {
    const errorMsg = error.message || String(error);
    console.error(`❌ Error generating topic:`, errorMsg);
    
    // If rate limited, wait longer before retrying
    if (errorMsg.includes('429') || errorMsg.includes('quota') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
      const waitTime = Math.min(30000, 5000 * Math.pow(2, attempt)); // Max 30s wait
      console.log(`⏳ Rate limit detected, waiting ${waitTime / 1000}s before retry...`);
      await sleep(waitTime);
    } else if (attempt < 5) {
      // For other errors, wait a bit before retrying
      await sleep(2000 * attempt);
    }
    
    if (attempt < 5) {
      return await generateTopic(existingTitles, attempt + 1);
    }
    throw error;
  }
}

/**
 * Generate a how-to article
 */
async function generateHowToArticle(topicTitle, existingTitles) {
  try {
    console.log(`📝 Generating how-to article: ${topicTitle.substring(0, 60)}...`);

    // Vary the prompt tone slightly
    const toneVariations = [
      "Write in a clear, helpful, and professional tone",
      "Write in a friendly, step-by-step manner",
      "Write in a concise, technical but accessible style",
      "Write in a practical, no-nonsense tone",
      "Write in a detailed, educational style"
    ];
    const tone = toneVariations[Math.floor(Math.random() * toneVariations.length)];

    const prompt = `You are an expert technical writer creating an original How-To / Error Fix guide.

TOPIC: "${topicTitle}"

${tone}. Write an original, comprehensive guide that helps users solve this specific problem.

ARTICLE STRUCTURE (REQUIRED):
1. **Problem Explanation** (1-2 paragraphs)
   - Clearly describe the specific error or issue
   - Explain what users see when they encounter this problem

2. **Why It Happens** (1-2 paragraphs)
   - Explain the root cause(s) of the problem
   - Provide context about why this error occurs

3. **Step-by-Step Solution** (5-7 numbered steps)
   - Provide clear, actionable steps to fix the problem
   - Each step should be specific and easy to follow
   - Include exact commands, settings, or actions where applicable
   - Use H2 or H3 headings for each step (e.g., "## Step 1: ...")

4. **Common Mistakes** (1-2 paragraphs)
   - List common mistakes people make when trying to fix this
   - Help users avoid pitfalls

5. **Prevention Tips** (1-2 paragraphs)
   - Provide tips to prevent this issue from happening again
   - Include best practices

WRITING REQUIREMENTS:
- Write 800-1200 words total
- Use clear, specific language (avoid vague statements)
- Include actual error messages, commands, or code examples where relevant
- NO AI self-references (don't mention "AI", "this article", "this guide")
- NO clickbait language
- NO external links unless absolutely necessary for the solution
- NO generic filler content
- Make it original and specific to this exact problem
- Use markdown formatting (## for headings, ** for bold, etc.)
- Write naturally, as if you're an expert helping a colleague

CONTENT SAFETY:
- AdSense-safe and SEO-friendly
- No medical, legal, or financial advice
- No gambling, adult, or illegal content
- Focus purely on technical problem-solving

Return the output in this exact format:

TITLE:
META_DESCRIPTION:
KEYWORDS:
CONTENT:`;

    let textResponse;
    let usedModel = "";

    // Try models in order with retry logic
    for (const modelName of MODEL_NAMES) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        
        // Retry with backoff for each model
        const result = await retryWithBackoff(async () => {
          return await model.generateContent(prompt);
        }, 2, 1000); // 2 retries, 1s base delay
        
        const response = await result.response;
        textResponse = response.text();
        usedModel = modelName;
        console.log(`✅ Generated with ${modelName}`);
        break;
      } catch (error) {
        const errorMsg = error.message || String(error);
        const shortMsg = errorMsg.length > 100 ? errorMsg.substring(0, 100) + '...' : errorMsg;
        console.warn(`⚠️ Failed with ${modelName}: ${shortMsg}`);
        
        // If rate limited, wait longer before trying next model
        if (errorMsg.includes('429') || errorMsg.includes('quota') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
          console.log(`⏳ Rate limit detected, waiting 5s before trying next model...`);
          await sleep(5000);
        }
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

    // Final duplicate check
    if (isDuplicateTitle(title, existingTitles)) {
      console.log(`⚠️ Duplicate title detected after generation: "${title}"`);
      return null;
    }

    const slug = slugify(title);
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    
    const fileName = `${dateStr}-${slug}.md`;
    const filePath = path.join(HOWTO_DIR, fileName);

    if (fs.existsSync(filePath)) {
      console.log(`⚠️ Duplicate file skipped: ${fileName}`);
      return null;
    }

    if (!fs.existsSync(HOWTO_DIR)) {
      fs.mkdirSync(HOWTO_DIR, { recursive: true });
    }

    const markdown = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${now.toISOString()}"
slug: "${slug}"
type: "how-to"
description: "${(description || '').replace(/"/g, '\\"')}"
keywords: "${(keywords || '').replace(/"/g, '\\"')}"
---

${content}`;

    fs.writeFileSync(filePath, markdown);
    console.log(`✅ How-to article generated: ${fileName}`);

    return {
      fileName,
      title,
      slug
    };

  } catch (error) {
    console.error(`❌ Error generating how-to article:`, error.message);
    return null;
  }
}

/**
 * Main function
 */
async function generateHowTos() {
  try {
    console.log("🚀 Starting how-to generation process...\n");
    console.log(`📊 Target: ${ARTICLES_PER_RUN} article(s) per run\n`);

    // Get existing titles for duplicate checking
    const existingTitles = getExistingTitles();
    console.log(`📋 Found ${existingTitles.length} existing how-to articles\n`);

    const generated = [];
    const skipped = [];

    for (let i = 0; i < ARTICLES_PER_RUN; i++) {
      try {
        console.log(`\n[${i + 1}/${ARTICLES_PER_RUN}] Generating article...`);

        // Generate a unique topic
        const topicTitle = await generateTopic(existingTitles);
        console.log(`📌 Topic: ${topicTitle}`);

        // Generate the article
        const article = await generateHowToArticle(topicTitle, existingTitles);
        
        if (article) {
          generated.push(article);
          existingTitles.push(article.title.toLowerCase()); // Update existing titles
          console.log(`✅ Successfully generated: ${article.title}`);
        } else {
          skipped.push(topicTitle);
          console.log(`⚠️ Skipped: ${topicTitle}`);
        }

        // Rate limiting: wait between requests (longer delay to avoid rate limits)
        if (i < ARTICLES_PER_RUN - 1) {
          const delay = 5000; // 5 second delay between articles
          console.log(`⏳ Waiting ${delay / 1000}s before next article...`);
          await sleep(delay);
        }

      } catch (error) {
        console.error(`❌ Error in iteration ${i + 1}:`, error.message);
        skipped.push(`Iteration ${i + 1}`);
      }
    }

    console.log(`\n\n📊 Generation Summary:`);
    console.log(`✅ Generated: ${generated.length} articles`);
    console.log(`⚠️ Skipped: ${skipped.length} articles`);

    if (generated.length > 0) {
      console.log(`\n✅ Successfully generated ${generated.length} how-to article(s):`);
      generated.forEach(art => {
        console.log(`   - ${art.title}`);
      });
    }

    if (skipped.length > 0) {
      console.log(`\n⚠️ Skipped ${skipped.length} article(s):`);
      skipped.forEach(item => {
        console.log(`   - ${item}`);
      });
    }

    if (generated.length === 0) {
      console.log("\nℹ️ No articles were generated.");
    }

  } catch (error) {
    console.error("❌ Fatal error:", error);
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('generateHowTo.mjs')) {
  generateHowTos().catch(console.error);
}

