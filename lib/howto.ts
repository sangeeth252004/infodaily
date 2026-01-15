import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const howtoDirectory = path.join(process.cwd(), 'how-to')

export interface HowTo {
  slug: string
  title: string
  description: string
  date: string
  keywords: string
  type: string
  content?: string
}

/**
 * Get all how-to articles from the how-to directory
 * Automatically detects new markdown files
 */
export function getAllHowTos(): HowTo[] {
  // Ensure how-to directory exists
  if (!fs.existsSync(howtoDirectory)) {
    fs.mkdirSync(howtoDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(howtoDirectory)
  const allHowTosData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
      
      // Read markdown file as string
      const fullPath = path.join(howtoDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      
      // Use gray-matter to parse the frontmatter
      const { data, content } = matter(fileContents)
      
      // Combine the data with the slug
      return {
        slug: data.slug || slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        keywords: data.keywords || '',
        type: data.type || 'how-to',
        content,
      }
    })

  // Sort how-tos by date (newest first)
  return allHowTosData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

/**
 * Get how-to article data by slug
 */
export async function getHowToBySlug(slug: string): Promise<HowTo & { content: string }> {
  // Find the file that matches the slug
  const allHowTos = getAllHowTos()
  const howto = allHowTos.find((h) => h.slug === slug)

  if (!howto) {
    throw new Error(`How-to article with slug "${slug}" not found`)
  }

  // Get the full path to the markdown file
  const fileNames = fs.readdirSync(howtoDirectory)
  const fileName = fileNames.find((name) => {
    const fileSlug = name.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
    return fileSlug === slug || name.includes(slug)
  })

  if (!fileName) {
    throw new Error(`File for how-to article with slug "${slug}" not found`)
  }

  const fullPath = path.join(howtoDirectory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  // Combine the data with the contentHtml
  return {
    slug: data.slug || slug,
    title: data.title || 'Untitled',
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    keywords: data.keywords || '',
    type: data.type || 'how-to',
    content: contentHtml,
  }
}


