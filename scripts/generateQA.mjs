/**
 * Q&A Generation Script
 * Generates original Q&A entries using Gemini AI
 * Includes anti-duplicate logic and quality controls
 */

import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

const QA_DIR = path.join(process.cwd(), "qa");
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Configuration
const QAS_PER_RUN = parseInt(process.env.QA_PER_RUN || "3", 10); // Default: 3 Q&As per run
const MAX_DAILY = parseInt(process.env.QA_DAILY_LIMIT || "5", 10); // Max 5 per day
const DELAY_BETWEEN_GENERATIONS = 90000; // 90 seconds in milliseconds
const MODEL_NAME = "gemini-2.5-flash"; // Use only this model

// Safe question patterns
const QUESTION_PATTERNS = [
  "What is",
  "Why does",
  "How does",
  "Is it safe to",
  "Difference between",
  "Can AI",
  "What are",
  "How can",
  "When should",
  "Where does",
];

// Topics to avoid
const AVOID_TOPICS = [
  "news",
  "politics",
  "medical",
  "legal advice",
  "adult content",
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
 * Get all existing questions for duplicate checking
 */
function getExistingQuestions() {
  if (!fs.existsSync(QA_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(QA_DIR);
  const questions = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith('.md')) continue;
    
    try {
      const fullPath = path.join(QA_DIR, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const frontmatterMatch = fileContents.match(/^---\s*\n([\s\S]*?)\n---/);
      
      if (frontmatterMatch) {
        const questionMatch = frontmatterMatch[1].match(/question:\s*["']?([^"'\n]+)["']?/i);
        if (questionMatch) {
          questions.push(questionMatch[1].toLowerCase().trim());
        }
      }
    } catch (error) {
      // Skip files that can't be read
      continue;
    }
  }

  return questions;
}

/**
 * Check if a question is too similar to existing questions
 */
function isDuplicateQuestion(newQuestion, existingQuestions) {
  const normalizedNew = newQuestion.toLowerCase().trim();
  
  // Exact match
  if (existingQuestions.includes(normalizedNew)) {
    return true;
  }

  // Check for high similarity (more than 80% word overlap)
  const newWords = new Set(normalizedNew.split(/\s+/).filter(w => w.length > 3));
  
  for (const existingQuestion of existingQuestions) {
    const existingWords = new Set(existingQuestion.split(/\s+/).filter(w => w.length > 3));
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
  if (!fs.existsSync(QA_DIR)) {
    return true;
  }

  const today = new Date().toISOString().split('T')[0];
  const fileNames = fs.readdirSync(QA_DIR);
  const todayCount = fileNames.filter(name => name.startsWith(today)).length;

  return todayCount < MAX_DAILY;
}

/**
 * Generate a unique question
 */
async function generateQuestion(existingQuestions, attempt = 1) {
  if (attempt > 5) {
    throw new Error("Failed to generate unique question after 5 attempts");
  }

  const pattern = QUESTION_PATTERNS[Math.floor(Math.random() * QUESTION_PATTERNS.length)];
  
  const prompt = `Generate a single, specific question about technology, AI, software, or digital topics.

REQUIREMENTS:
- Must start with: "${pattern}"
- Must be educational and factual
- Must be specific (not generic)
- Must be safe for AdSense (no medical, legal, political, or adult content)
- Must be 10-20 words long
- Must be a real question people would ask

EXAMPLES OF GOOD QUESTIONS:
- "What is machine learning and how does it work?"
- "Why does my computer slow down over time?"
- "How does cloud storage work?"
- "Is it safe to use public Wi-Fi for banking?"
- "Difference between RAM and storage in computers"
- "Can AI replace human jobs?"

EXAMPLES OF BAD QUESTIONS (TOO GENERIC OR UNSAFE):
- "What is technology?" (too generic)
- "How to fix my computer?" (too vague)
- "Is X medication safe?" (medical - avoid)
- "What is the best political party?" (political - avoid)

Generate ONE question that starts with "${pattern}" and meets all requirements.

Return ONLY the question, nothing else.`;

  try {
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let question = response.text().trim();

    // Clean the question
    question = question
      .replace(/^["']|["']$/g, '') // Remove quotes
      .replace(/^Question:\s*/i, '') // Remove "Question:" prefix if present
      .trim();

    // Validate question
    if (question.length < 20 || question.length > 200) {
      console.log(`⚠️ Question length invalid (${question.length} chars), retrying...`);
      return await generateQuestion(existingQuestions, attempt + 1);
    }

    // Check if it starts with a valid pattern
    const startsWithPattern = QUESTION_PATTERNS.some(p => 
      question.toLowerCase().startsWith(p.toLowerCase())
    );
    if (!startsWithPattern) {
      console.log(`⚠️ Question doesn't start with valid pattern, retrying...`);
      return await generateQuestion(existingQuestions, attempt + 1);
    }

    // Check for avoided topics
    const lowerQuestion = question.toLowerCase();
    for (const avoidTopic of AVOID_TOPICS) {
      if (lowerQuestion.includes(avoidTopic)) {
        console.log(`⚠️ Question contains avoided topic: "${avoidTopic}", retrying...`);
        return await generateQuestion(existingQuestions, attempt + 1);
      }
    }

    // Check for duplicates
    if (isDuplicateQuestion(question, existingQuestions)) {
      console.log(`⚠️ Duplicate question detected: "${question}", retrying...`);
      return await generateQuestion(existingQuestions, attempt + 1);
    }

    return question;

  } catch (error) {
    const errorMsg = error.message || String(error);
    console.error(`❌ Error generating question:`, errorMsg);
    
    if (attempt < 5) {
      await sleep(2000 * attempt);
      return await generateQuestion(existingQuestions, attempt + 1);
    }
    throw error;
  }
}

/**
 * Generate a Q&A entry
 */
async function generateQAEntry(question, existingQuestions) {
  try {
    console.log(`📝 Generating Q&A for: ${question.substring(0, 60)}...`);

    const prompt = `You are an expert educator answering questions clearly and factually.
Write neutral, accurate, original answers.
Avoid repeated phrasing across answers.
Do not mention AI or yourself.
Do not exaggerate or add opinions.

Question: ${question}

Instructions:
1. Start with a direct answer (2–3 sentences)
2. Explain the topic clearly in short paragraphs
3. Add a simple example if relevant
4. Mention limitations or edge cases if any
5. Avoid filler phrases like 'In conclusion'
6. Use simple, professional language

Return the output in this exact format:

DIRECT_ANSWER:
[2-3 sentence direct answer]

DETAILED_EXPLANATION:
[Detailed explanation in markdown format with headings, paragraphs, and examples if applicable]

KEYWORDS:
[comma-separated keywords for SEO]`;

    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();

    // Parse response
    const directAnswerMatch = textResponse.match(/DIRECT_ANSWER:\s*(.*?)(?=\nDETAILED_EXPLANATION:)/s);
    const detailedExplanationMatch = textResponse.match(/DETAILED_EXPLANATION:\s*(.*?)(?=\nKEYWORDS:)/s);
    const keywordsMatch = textResponse.match(/KEYWORDS:\s*(.*?)(?:\n|$)/s);

    const directAnswer = directAnswerMatch?.[1]?.trim() || '';
    const detailedExplanation = detailedExplanationMatch?.[1]?.trim() || '';
    const keywords = keywordsMatch?.[1]?.trim() || '';

    if (!directAnswer || !detailedExplanation) {
      throw new Error("Invalid AI output format - missing required sections");
    }

    // Final duplicate check
    if (isDuplicateQuestion(question, existingQuestions)) {
      console.log(`⚠️ Duplicate question detected after generation: "${question}"`);
      return null;
    }

    const slug = slugify(question);
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    
    const fileName = `${dateStr}-${slug}.md`;
    const filePath = path.join(QA_DIR, fileName);

    if (fs.existsSync(filePath)) {
      console.log(`⚠️ Duplicate file skipped: ${fileName}`);
      return null;
    }

    if (!fs.existsSync(QA_DIR)) {
      fs.mkdirSync(QA_DIR, { recursive: true });
    }

    const markdown = `---
question: "${question.replace(/"/g, '\\"')}"
answer: "${directAnswer.replace(/"/g, '\\"')}"
date: "${now.toISOString()}"
slug: "${slug}"
keywords: "${keywords.replace(/"/g, '\\"')}"
---

${detailedExplanation}`;

    fs.writeFileSync(filePath, markdown);
    console.log(`✅ Q&A entry generated: ${fileName}`);

    return {
      fileName,
      question,
      slug,
      answer: directAnswer
    };

  } catch (error) {
    console.error(`❌ Error generating Q&A entry:`, error.message);
    return null;
  }
}

/**
 * Main function
 */
async function generateQAs() {
  try {
    console.log("🚀 Starting Q&A generation process...\n");
    
    // Check daily limit
    if (!checkDailyLimit()) {
      console.log(`⚠️ Daily limit reached (${MAX_DAILY} Q&As per day). Skipping generation.`);
      return;
    }

    console.log(`📊 Target: ${QAS_PER_RUN} Q&A(s) per run\n`);

    // Get existing questions for duplicate checking
    const existingQuestions = getExistingQuestions();
    console.log(`📋 Found ${existingQuestions.length} existing Q&A entries\n`);

    const generated = [];
    const skipped = [];

    for (let i = 0; i < QAS_PER_RUN; i++) {
      try {
        // Check daily limit again before each generation
        if (!checkDailyLimit()) {
          console.log(`\n⚠️ Daily limit reached. Stopping generation.`);
          break;
        }

        console.log(`\n[${i + 1}/${QAS_PER_RUN}] Generating Q&A entry...`);

        // Generate a unique question
        const question = await generateQuestion(existingQuestions);
        console.log(`📌 Question: ${question}`);

        // Generate the Q&A entry
        const qaEntry = await generateQAEntry(question, existingQuestions);
        
        if (qaEntry) {
          generated.push(qaEntry);
          existingQuestions.push(question.toLowerCase()); // Update existing questions
          console.log(`✅ Successfully generated: ${qaEntry.question}`);
        } else {
          skipped.push(question);
          console.log(`⚠️ Skipped: ${question}`);
        }

        // Wait 90 seconds between generations (except after the last one)
        if (i < QAS_PER_RUN - 1) {
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
    console.log(`✅ Generated: ${generated.length} Q&A entries`);
    console.log(`⚠️ Skipped: ${skipped.length} Q&A entries`);

    if (generated.length > 0) {
      console.log(`\n✅ Successfully generated ${generated.length} Q&A entry/entries:`);
      generated.forEach(qa => {
        console.log(`   - ${qa.question}`);
      });
    }

    if (skipped.length > 0) {
      console.log(`\n⚠️ Skipped ${skipped.length} Q&A entry/entries:`);
      skipped.forEach(item => {
        console.log(`   - ${item}`);
      });
    }

    if (generated.length === 0) {
      console.log("\nℹ️ No Q&A entries were generated.");
    }

  } catch (error) {
    console.error("❌ Fatal error:", error);
    // Don't exit with error code - allow workflow to continue
    process.exit(0);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('generateQA.mjs')) {
  generateQAs().catch(console.error);
}

