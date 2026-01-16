import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const qaDirectory = path.join(process.cwd(), 'qa')

export interface QA {
  slug: string
  question: string
  answer: string
  date: string
  keywords: string
  content?: string
}

/**
 * Get all Q&A entries from the qa directory
 * Automatically detects new markdown files
 */
export function getAllQAs(): QA[] {
  // Ensure qa directory exists
  if (!fs.existsSync(qaDirectory)) {
    fs.mkdirSync(qaDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(qaDirectory)
  const allQAsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
      
      // Read markdown file as string
      const fullPath = path.join(qaDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      
      // Use gray-matter to parse the frontmatter
      const { data, content } = matter(fileContents)
      
      // Combine the data with the slug
      return {
        slug: data.slug || slug,
        question: data.question || 'Untitled Question',
        answer: data.answer || '',
        date: data.date || new Date().toISOString(),
        keywords: data.keywords || '',
        content,
      }
    })

  // Sort Q&As by date (newest first)
  return allQAsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

/**
 * Get Q&A entry data by slug
 */
export async function getQABySlug(slug: string): Promise<QA & { content: string }> {
  // Find the file that matches the slug
  const allQAs = getAllQAs()
  const qa = allQAs.find((q) => q.slug === slug)

  if (!qa) {
    throw new Error(`Q&A entry with slug "${slug}" not found`)
  }

  // Get the full path to the markdown file
  const fileNames = fs.readdirSync(qaDirectory)
  const fileName = fileNames.find((name) => {
    const fileSlug = name.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
    return fileSlug === slug || name.includes(slug)
  })

  if (!fileName) {
    throw new Error(`File for Q&A entry with slug "${slug}" not found`)
  }

  const fullPath = path.join(qaDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  // Combine the data with the contentHtml
  return {
    slug: data.slug || slug,
    question: data.question || 'Untitled Question',
    answer: data.answer || '',
    date: data.date || new Date().toISOString(),
    keywords: data.keywords || '',
    content: contentHtml,
  }
}

