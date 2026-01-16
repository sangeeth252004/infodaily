import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const vsDirectory = path.join(process.cwd(), 'vs')

export interface Comparison {
  slug: string
  title: string
  itemA: string
  itemB: string
  summary: string
  date: string
  keywords: string
  content?: string
}

/**
 * Get all comparison entries from the vs directory
 * Automatically detects new markdown files
 */
export function getAllComparisons(): Comparison[] {
  // Ensure vs directory exists
  if (!fs.existsSync(vsDirectory)) {
    fs.mkdirSync(vsDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(vsDirectory)
  const allComparisonsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
      
      // Read markdown file as string
      const fullPath = path.join(vsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      
      // Use gray-matter to parse the frontmatter
      const { data, content } = matter(fileContents)
      
      // Combine the data with the slug
      return {
        slug: data.slug || slug,
        title: data.title || 'Untitled Comparison',
        itemA: data.itemA || '',
        itemB: data.itemB || '',
        summary: data.summary || '',
        date: data.date || new Date().toISOString(),
        keywords: data.keywords || '',
        content,
      }
    })

  // Sort comparisons by date (newest first)
  return allComparisonsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

/**
 * Get comparison entry data by slug
 */
export async function getComparisonBySlug(slug: string): Promise<Comparison & { content: string }> {
  // Find the file that matches the slug
  const allComparisons = getAllComparisons()
  const comparison = allComparisons.find((c) => c.slug === slug)

  if (!comparison) {
    throw new Error(`Comparison entry with slug "${slug}" not found`)
  }

  // Get the full path to the markdown file
  const fileNames = fs.readdirSync(vsDirectory)
  const fileName = fileNames.find((name) => {
    const fileSlug = name.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
    return fileSlug === slug || name.includes(slug)
  })

  if (!fileName) {
    throw new Error(`File for comparison entry with slug "${slug}" not found`)
  }

  const fullPath = path.join(vsDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  // Combine the data with the contentHtml
  return {
    slug: data.slug || slug,
    title: data.title || 'Untitled Comparison',
    itemA: data.itemA || '',
    itemB: data.itemB || '',
    summary: data.summary || '',
    date: data.date || new Date().toISOString(),
    keywords: data.keywords || '',
    content: contentHtml,
  }
}

