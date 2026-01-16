import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const meaningDirectory = path.join(process.cwd(), 'meaning')

export interface Meaning {
  slug: string
  term: string
  definition: string
  date: string
  keywords: string
  content?: string
}

/**
 * Get all meaning entries from the meaning directory
 * Automatically detects new markdown files
 */
export function getAllMeanings(): Meaning[] {
  // Ensure meaning directory exists
  if (!fs.existsSync(meaningDirectory)) {
    fs.mkdirSync(meaningDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(meaningDirectory)
  const allMeaningsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
      
      // Read markdown file as string
      const fullPath = path.join(meaningDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      
      // Use gray-matter to parse the frontmatter
      const { data, content } = matter(fileContents)
      
      // Combine the data with the slug
      return {
        slug: data.slug || slug,
        term: data.term || 'Untitled Term',
        definition: data.definition || '',
        date: data.date || new Date().toISOString(),
        keywords: data.keywords || '',
        content,
      }
    })

  // Sort meanings by term alphabetically (for dictionary-style listing)
  return allMeaningsData.sort((a, b) => {
    return a.term.localeCompare(b.term, undefined, { sensitivity: 'base' })
  })
}

/**
 * Get meaning entry data by slug
 */
export async function getMeaningBySlug(slug: string): Promise<Meaning & { content: string }> {
  // Find the file that matches the slug
  const allMeanings = getAllMeanings()
  const meaning = allMeanings.find((m) => m.slug === slug)

  if (!meaning) {
    throw new Error(`Meaning entry with slug "${slug}" not found`)
  }

  // Get the full path to the markdown file
  const fileNames = fs.readdirSync(meaningDirectory)
  const fileName = fileNames.find((name) => {
    const fileSlug = name.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
    return fileSlug === slug || name.includes(slug)
  })

  if (!fileName) {
    throw new Error(`File for meaning entry with slug "${slug}" not found`)
  }

  const fullPath = path.join(meaningDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  // Combine the data with the contentHtml
  return {
    slug: data.slug || slug,
    term: data.term || 'Untitled Term',
    definition: data.definition || '',
    date: data.date || new Date().toISOString(),
    keywords: data.keywords || '',
    content: contentHtml,
  }
}

