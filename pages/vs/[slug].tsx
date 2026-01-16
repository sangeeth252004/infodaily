import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getAllComparisons, getComparisonBySlug, Comparison } from '../../lib/vs'
import { format } from 'date-fns'
import { cleanTitle, getCanonicalUrl, getSiteMetadata } from '../../lib/seo'

interface ComparisonPageProps {
  comparison: Comparison & { content: string; formattedDate: string; cleanTitle: string }
  relatedComparisons: Array<Comparison & { formattedDate: string; cleanTitle: string }>
}

export default function ComparisonPage({ comparison, relatedComparisons }: ComparisonPageProps) {
  const siteMeta = getSiteMetadata()
  const cleanComparisonTitle = comparison.cleanTitle
  const pageTitle = `${cleanComparisonTitle}: Key Differences Explained | InfoDaily`
  const canonicalUrl = getCanonicalUrl(`/vs/${comparison.slug}`)
  const publishedDate = new Date(comparison.date).toISOString()
  
  // Generate JSON-LD structured data for Article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: cleanComparisonTitle,
    description: comparison.summary,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      '@type': 'Organization',
      name: 'InfoDaily',
    },
    publisher: {
      '@type': 'Organization',
      name: siteMeta.name,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  }

  // Get meta description from summary (max 160 chars)
  const metaDescription = comparison.summary.length > 160 
    ? comparison.summary.substring(0, 160).trim() + '...' 
    : comparison.summary

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={comparison.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={cleanComparisonTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:site_name" content={siteMeta.name} />
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:modified_time" content={publishedDate} />
        <meta property="article:author" content="InfoDaily" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={cleanComparisonTitle} />
        <meta name="twitter:description" content={metaDescription} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </Head>

      <div className="container">
        <header className="header">
          <nav className="main-nav">
            <Link href="/" className="site-title">InfoDaily</Link>
            <div className="nav-links">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/posts" className="nav-link">Posts</Link>
              <Link href="/how-to" className="nav-link">How-To</Link>
              <Link href="/calculators" className="nav-link">Calculators</Link>
              <Link href="/qa" className="nav-link">Q&A</Link>
              <Link href="/meaning" className="nav-link">Meanings</Link>
              <Link href="/vs" className="nav-link active">Comparisons</Link>
            </div>
          </nav>
        </header>

        <main className="post-container">
          <nav className="breadcrumb">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <Link href="/vs" className="breadcrumb-link">Comparisons</Link>
            <span className="breadcrumb-separator">/</span>
            <span>{cleanComparisonTitle}</span>
          </nav>

          <article className="post">
            <header className="post-header">
              <h1 className="post-title">{cleanComparisonTitle}</h1>
              <div className="post-meta">
                <time dateTime={comparison.date}>
                  Published {comparison.formattedDate}
                </time>
              </div>
            </header>

            {/* Summary Section - At the top */}
            <div className="post-content" style={{ marginTop: '2rem' }}>
              <div style={{ 
                backgroundColor: '#f9fafb', 
                padding: '1.5rem', 
                borderRadius: '8px', 
                marginBottom: '2rem',
                borderLeft: '4px solid #8b5cf6'
              }}>
                <p style={{ fontSize: '1.125rem', lineHeight: '1.75', color: '#374151', margin: 0 }}>
                  {comparison.summary}
                </p>
              </div>

              {/* Detailed Comparison Content */}
              <div 
                className="post-content"
                dangerouslySetInnerHTML={{ __html: comparison.content }}
              />
            </div>
          </article>

          {/* Related Comparisons */}
          {relatedComparisons.length > 0 && (
            <section style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: '#111827' }}>
                Related Comparisons
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {relatedComparisons.map((relatedComparison) => (
                  <Link
                    key={relatedComparison.slug}
                    href={`/vs/${relatedComparison.slug}`}
                    style={{
                      display: 'block',
                      padding: '1rem',
                      backgroundColor: '#f9fafb',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f3f4f6'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f9fafb'
                    }}
                  >
                    <h3 style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: 600, 
                      color: '#111827',
                      marginBottom: '0.5rem'
                    }}>
                      {relatedComparison.cleanTitle}
                    </h3>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: '#6b7280',
                      margin: 0
                    }}>
                      {relatedComparison.summary.length > 120 
                        ? relatedComparison.summary.substring(0, 120).trim() + '...' 
                        : relatedComparison.summary}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>

        <footer className="footer">
          <div className="footer-content">
            <nav className="footer-links">
              <Link href="/about" className="footer-link">About</Link>
              <Link href="/privacy-policy" className="footer-link">Privacy Policy</Link>
              <Link href="/contact" className="footer-link">Contact</Link>
              <Link href="/disclaimer" className="footer-link">Disclaimer</Link>
            </nav>
            <p className="footer-copyright" suppressHydrationWarning>&copy; {new Date().getFullYear()} InfoDaily. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const comparisons = getAllComparisons()
  
  return {
    paths: comparisons.map((comparison) => ({
      params: { slug: comparison.slug },
    })),
    fallback: false, // false is required for static export (output: 'export')
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const comparison = await getComparisonBySlug(slug)

  if (!comparison) {
    return {
      notFound: true,
    }
  }

  // Get related comparisons (excluding current, limit to 4)
  const allComparisons = getAllComparisons()
  const relatedComparisons = allComparisons
    .filter((c) => c.slug !== comparison.slug)
    .slice(0, 4)

  // Pre-format dates and clean titles to ensure consistency
  const formattedComparisonDate = format(new Date(comparison.date), 'MMMM dd, yyyy')
  const formattedRelatedComparisons = relatedComparisons.map((c) => ({
    ...c,
    formattedDate: format(new Date(c.date), 'MMMM dd, yyyy'),
    cleanTitle: cleanTitle(c.title),
  }))

  return {
    props: {
      comparison: {
        ...comparison,
        formattedDate: formattedComparisonDate,
        cleanTitle: cleanTitle(comparison.title),
      },
      relatedComparisons: formattedRelatedComparisons,
    }
    // Note: revalidate removed - not compatible with static export (output: 'export')
    // Pages will regenerate on each build (when new comparisons are added via GitHub Actions)
  }
}

