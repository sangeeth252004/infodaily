/**
 * SEO Helper Utilities
 * Provides functions for cleaning text and generating SEO-friendly meta data
 */

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com'
const SITE_NAME = 'InfoDaily'

/**
 * Clean markdown artifacts from titles/text
 * Removes **, __, and other markdown formatting
 */
export function cleanTitle(text: string): string {
  if (!text) return ''
  return text
    .replace(/\*\*/g, '') // Remove bold markdown
    .replace(/__/g, '') // Remove underline markdown
    .replace(/\*/g, '') // Remove any remaining asterisks
    .replace(/_/g, '') // Remove any remaining underscores
    .trim()
}

/**
 * Generate canonical URL for a page
 */
export function getCanonicalUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${cleanPath}`
}

/**
 * Get site metadata
 */
export function getSiteMetadata() {
  return {
    url: SITE_URL,
    name: SITE_NAME,
    title: `${SITE_NAME} – Trusted Insights on Technology, AI, Health & Education`,
    description: 'InfoDaily delivers trusted, easy-to-understand insights on technology, AI, health, and education.',
  }
}


