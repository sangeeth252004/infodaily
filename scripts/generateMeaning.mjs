/**
 * Meaning / Definition Generation Script
 * Generates original dictionary-style definitions using Gemini AI
 * Includes anti-duplicate logic and quality controls
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

// Configuration
const MEANINGS_PER_RUN = parseInt(process.env.MEANING_PER_RUN || "5", 10); // Default: 5 definitions per run
const MAX_DAILY = parseInt(process.env.MEANING_DAILY_LIMIT || "5", 10); // Max 5 per day
const DELAY_BETWEEN_GENERATIONS = 90000; // 90 seconds in milliseconds
const MODEL_NAME = "gemini-2.5-flash"; // Use only this model

// Safe term categories
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
  "data science terms",
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
 * Get all existing terms for duplicate checking
 */
function getExistingTerms() {
  if (!fs.existsSync(MEANING_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(MEANING_DIR);
  const terms = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith('.md')) continue;
    
    try {
      const fullPath = path.join(MEANING_DIR, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const frontmatterMatch = fileContents.match(/^---\s*\n([\s\S]*?)\n---/);
      
      if (frontmatterMatch) {
        const termMatch = frontmatterMatch[1].match(/term:\s*["']?([^"'\n]+)["']?/i);
        if (termMatch) {
          terms.push(termMatch[1].toLowerCase().trim());
        }
      }
    } catch (error) {
      // Skip files that can't be read
      continue;
    }
  }

  return terms;
}

/**
 * Check if a term is too similar to existing terms
 */
function isDuplicateTerm(newTerm, existingTerms) {
  const normalizedNew = newTerm.toLowerCase().trim();
  
  // Exact match
  if (existingTerms.includes(normalizedNew)) {
    return true;
  }

  // Check for high similarity (more than 80% word overlap)
  const newWords = new Set(normalizedNew.split(/\s+/).filter(w => w.length > 2));
  
  for (const existingTerm of existingTerms) {
    const existingWords = new Set(existingTerm.split(/\s+/).filter(w => w.length > 2));
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
 * Check daily limit
 */
function checkDailyLimit() {
  if (!fs.existsSync(MEANING_DIR)) {
    return true;
  }

  const today = new Date().toISOString().split('T')[0];
  const fileNames = fs.readdirSync(MEANING_DIR);
  const todayCount = fileNames.filter(name => name.startsWith(today)).length;

  return todayCount < MAX_DAILY;
}

/**
 * Generate a unique term
 */
async function generateTerm(existingTerms, attempt = 1) {
  if (attempt > 5) {
    throw new Error("Failed to generate unique term after 5 attempts");
  }

  const category = TERM_CATEGORIES[Math.floor(Math.random() * TERM_CATEGORIES.length)];
  
  const prompt = `Generate a single, specific term from the category: "${category}"

REQUIREMENTS:
- Must be a real, commonly used term in technology, AI, software, business, or digital fields
- Must be 1-4 words long
- Must be educational and factual
- Must be safe for AdSense (no medical, legal, political, or adult content)
- Must be a term that people would look up in a dictionary
- Should be specific (not too generic)

EXAMPLES OF GOOD TERMS:
- "Machine Learning"
- "API"
- "Cloud Computing"
- "Agile Methodology"
- "Blockchain"
- "Responsive Design"
- "Version Control"
- "Big Data"

EXAMPLES OF BAD TERMS (TOO GENERIC OR UNSAFE):
- "Computer" (too generic)
- "Software" (too generic)
- "Medicine" (medical - avoid)
- "Law" (legal - avoid)

Generate ONE term from the category "${category}".

Return ONLY the term, nothing else.`;

  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let term = response.text().trim();

    // Clean the term
    term = term
      .replace(/^["']|["']$/g, '') // Remove quotes
      .replace(/^Term:\s*/i, '') // Remove "Term:" prefix if present
      .trim();

    // Validate term
    if (term.length < 2 || term.length > 50) {
      console.log(`⚠️ Term length invalid (${term.length} chars), retrying...`);
      return await generateTerm(existingTerms, attempt + 1);
    }

    // Check for avoided topics
    const lowerTerm = term.toLowerCase();
    for (const avoidTopic of AVOID_TOPICS) {
      if (lowerTerm.includes(avoidTopic)) {
        console.log(`⚠️ Term contains avoided topic: "${avoidTopic}", retrying...`);
        return await generateTerm(existingTerms, attempt + 1);
      }
    }

    // Check for duplicates
    if (isDuplicateTerm(term, existingTerms)) {
      console.log(`⚠️ Duplicate term detected: "${term}", retrying...`);
      return await generateTerm(existingTerms, attempt + 1);
    }

    return term;

  } catch (error) {
    const errorMsg = error.message || String(error);
    console.error(`❌ Error generating term:`, errorMsg);
    
    if (attempt < 5) {
      await sleep(2000 * attempt);
      return await generateTerm(existingTerms, attempt + 1);
    }
    throw error;
  }
}

/**
 * Generate a meaning entry
 */
async function generateMeaningEntry(term, existingTerms) {
  try {
    console.log(`📝 Generating definition for: ${term}...`);

    const prompt = `You are a dictionary-style writer explaining terms clearly and accurately.
Write neutral, factual, original definitions.
Avoid repeated phrasing.
Do not mention AI or yourself.
Keep explanations simple and trustworthy.

Term: ${term}

Instructions:
1. Start with a clear one-sentence definition
2. Explain the term in simple language
3. Add one example sentence or usage
4. Mention context where the term is commonly used
5. Avoid filler phrases and conclusions
6. Use professional, neutral tone

Return the output in this exact format:

DEFINITION:
[One clear sentence definition]

DETAILED_EXPLANATION:
[Detailed explanation in markdown format with paragraphs, example sentence, and context]

KEYWORDS:
[comma-separated keywords for SEO]`;

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();

    // Parse response
    const definitionMatch = textResponse.match(/DEFINITION:\s*(.*?)(?=\nDETAILED_EXPLANATION:)/s);
    const detailedExplanationMatch = textResponse.match(/DETAILED_EXPLANATION:\s*(.*?)(?=\nKEYWORDS:)/s);
    const keywordsMatch = textResponse.match(/KEYWORDS:\s*(.*?)(?:\n|$)/s);

    const definition = definitionMatch?.[1]?.trim() || '';
    const detailedExplanation = detailedExplanationMatch?.[1]?.trim() || '';
    const keywords = keywordsMatch?.[1]?.trim() || '';

    if (!definition || !detailedExplanation) {
      throw new Error("Invalid AI output format - missing required sections");
    }

    // Final duplicate check
    if (isDuplicateTerm(term, existingTerms)) {
      console.log(`⚠️ Duplicate term detected after generation: "${term}"`);
      return null;
    }

    const slug = slugify(term);
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    
    const fileName = `${dateStr}-${slug}.md`;
    const filePath = path.join(MEANING_DIR, fileName);

    if (fs.existsSync(filePath)) {
      console.log(`⚠️ Duplicate file skipped: ${fileName}`);
      return null;
    }

    if (!fs.existsSync(MEANING_DIR)) {
      fs.mkdirSync(MEANING_DIR, { recursive: true });
    }

    // Escape quotes in frontmatter values
    const escapeQuotes = (str) => str.replace(/"/g, '\\"').replace(/\n/g, ' ');

    const markdown = `---
term: "${escapeQuotes(term)}"
definition: "${escapeQuotes(definition)}"
date: "${now.toISOString()}"
slug: "${slug}"
keywords: "${escapeQuotes(keywords || '')}"
---

${detailedExplanation}`;

    fs.writeFileSync(filePath, markdown);
    console.log(`✅ Definition generated: ${fileName}`);

    return {
      fileName,
      term,
      slug,
      definition
    };

  } catch (error) {
    console.error(`❌ Error generating definition:`, error.message);
    return null;
  }
}

/**
 * Main function
 */
async function generateMeanings() {
  try {
    console.log("🚀 Starting meaning generation process...\n");
    
    // Check daily limit
    if (!checkDailyLimit()) {
      console.log(`⚠️ Daily limit reached (${MAX_DAILY} definitions per day). Skipping generation.`);
      return;
    }

    console.log(`📊 Target: ${MEANINGS_PER_RUN} definition(s) per run\n`);

    // Get existing terms for duplicate checking
    const existingTerms = getExistingTerms();
    console.log(`📋 Found ${existingTerms.length} existing definitions\n`);

    const generated = [];
    const skipped = [];

    for (let i = 0; i < MEANINGS_PER_RUN; i++) {
      try {
        // Check daily limit again before each generation
        if (!checkDailyLimit()) {
          console.log(`\n⚠️ Daily limit reached. Stopping generation.`);
          break;
        }

        console.log(`\n[${i + 1}/${MEANINGS_PER_RUN}] Generating definition...`);

        // Generate a unique term
        const term = await generateTerm(existingTerms);
        console.log(`📌 Term: ${term}`);

        // Generate the definition
        const meaningEntry = await generateMeaningEntry(term, existingTerms);
        
        if (meaningEntry) {
          generated.push(meaningEntry);
          existingTerms.push(term.toLowerCase()); // Update existing terms
          console.log(`✅ Successfully generated: ${meaningEntry.term}`);
        } else {
          skipped.push(term);
          console.log(`⚠️ Skipped: ${term}`);
        }

        // Wait 90 seconds between generations (except after the last one)
        if (i < MEANINGS_PER_RUN - 1) {
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
    console.log(`✅ Generated: ${generated.length} definitions`);
    console.log(`⚠️ Skipped: ${skipped.length} definitions`);

    if (generated.length > 0) {
      console.log(`\n✅ Successfully generated ${generated.length} definition(s):`);
      generated.forEach(meaning => {
        console.log(`   - ${meaning.term}`);
      });
    }

    if (skipped.length > 0) {
      console.log(`\n⚠️ Skipped ${skipped.length} definition(s):`);
      skipped.forEach(item => {
        console.log(`   - ${item}`);
      });
    }

    if (generated.length === 0) {
      console.log("\nℹ️ No definitions were generated.");
    }

  } catch (error) {
    console.error("❌ Fatal error:", error);
    // Don't exit with error code - allow workflow to continue
    process.exit(0);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('generateMeaning.mjs')) {
  generateMeanings().catch(console.error);
}
