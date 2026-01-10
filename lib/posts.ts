import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface Post {
  slug: string
  title: string
  description: string
  date: string
  keywords: string
  category: string
  content?: string
}

/**
 * Get all posts from the posts directory
 * Automatically detects new markdown files
 */
export function getAllPosts(): Post[] {
  // Ensure posts directory exists
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      // Remove ".md" from file name to get slug
      const slug = fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
      
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      
      // Use gray-matter to parse the post metadata section
      const { data, content } = matter(fileContents)
      
      // Combine the data with the slug
      return {
        slug: data.slug || slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || new Date().toISOString(),
        keywords: data.keywords || '',
        category: data.category || 'general',
        content,
      }
    })

  // Sort posts by date (newest first)
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

/**
 * Get post data by slug
 */
export async function getPostBySlug(slug: string): Promise<Post & { content: string }> {
  // Find the file that matches the slug
  const allPosts = getAllPosts()
  const post = allPosts.find((p) => p.slug === slug)

  if (!post) {
    throw new Error(`Post with slug "${slug}" not found`)
  }

  // Get the full path to the markdown file
  const fileNames = fs.readdirSync(postsDirectory)
  const fileName = fileNames.find((name) => {
    const fileSlug = name.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
    return fileSlug === slug || name.includes(slug)
  })

  if (!fileName) {
    throw new Error(`File for post with slug "${slug}" not found`)
  }

  const fullPath = path.join(postsDirectory, fileName)
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
    category: data.category || 'general',
    content: contentHtml,
  }
}

/**
 * Get all unique categories
 */
export function getAllCategories(): string[] {
  const posts = getAllPosts()
  const categories = new Set(posts.map((post) => post.category))
  return Array.from(categories).sort()
}

