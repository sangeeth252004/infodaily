import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getAllQAs, getQABySlug, QA } from '../../lib/qa'
import { format } from 'date-fns'
import { cleanTitle, getCanonicalUrl, getSiteMetadata } from '../../lib/seo'

interface QAPageProps {
  qa: QA & { content: string; formattedDate: string; cleanTitle: string }
  relatedQAs: Array<QA & { formattedDate: string; cleanTitle: string }>
}

export default function QAPage({ qa, relatedQAs }: QAPageProps) {
  const siteMeta = getSiteMetadata()
  const cleanQATitle = qa.cleanTitle
  const pageTitle = `${cleanQATitle} | InfoDaily`
  const canonicalUrl = getCanonicalUrl(`/qa/${qa.slug}`)
  const publishedDate = new Date(qa.date).toISOString()
  
  // Generate JSON-LD structured data for QAPage
  const qaPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: cleanQATitle,
      text: cleanQATitle,
      dateCreated: publishedDate,
      author: {
        '@type': 'Organization',
        name: 'InfoDaily',
      },
      acceptedAnswer: {
        '@type': 'Answer',
        text: qa.answer,
        dateCreated: publishedDate,
        author: {
          '@type': 'Organization',
          name: 'InfoDaily',
        },
      },
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

  // Get meta description from answer (first 150 characters)
  const metaDescription = qa.answer.length > 150 
    ? qa.answer.substring(0, 150).trim() + '...' 
    : qa.answer

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={qa.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={cleanQATitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:site_name" content={siteMeta.name} />
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:modified_time" content={publishedDate} />
        <meta property="article:author" content="InfoDaily" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={cleanQATitle} />
        <meta name="twitter:description" content={metaDescription} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(qaPageSchema) }}
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
              <Link href="/qa" className="nav-link active">Q&A</Link>
              <Link href="/meaning" className="nav-link">Meanings</Link>
              <Link href="/vs" className="nav-link">Comparisons</Link>
            </div>
          </nav>
        </header>

        <main className="post-container">
          <nav className="breadcrumb">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <Link href="/qa" className="breadcrumb-link">Q&A</Link>
            <span className="breadcrumb-separator">/</span>
            <span>{cleanQATitle}</span>
          </nav>

          <article className="post">
            <header className="post-header">
              <h1 className="post-title">{cleanQATitle}</h1>
              <div className="post-meta">
                <time dateTime={qa.date}>
                  Published {qa.formattedDate}
                </time>
              </div>
            </header>

            {/* Direct Answer Section - Above the fold */}
            <div className="post-content" style={{ marginTop: '2rem' }}>
              <div style={{ 
                backgroundColor: '#f9fafb', 
                padding: '1.5rem', 
                borderRadius: '8px', 
                marginBottom: '2rem',
                borderLeft: '4px solid #3b82f6'
              }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', color: '#111827' }}>
                  Direct Answer
                </h2>
                <p style={{ fontSize: '1.125rem', lineHeight: '1.75', color: '#374151' }}>
                  {qa.answer}
                </p>
              </div>

              {/* Detailed Explanation */}
              <div 
                className="post-content"
                dangerouslySetInnerHTML={{ __html: qa.content }}
              />
            </div>
          </article>

          {/* Related Questions */}
          {relatedQAs.length > 0 && (
            <section style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: '#111827' }}>
                Related Questions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {relatedQAs.map((relatedQA) => (
                  <Link
                    key={relatedQA.slug}
                    href={`/qa/${relatedQA.slug}`}
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
                      fontSize: '1rem', 
                      fontWeight: 600, 
                      color: '#111827',
                      marginBottom: '0.5rem'
                    }}>
                      {relatedQA.cleanTitle}
                    </h3>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: '#6b7280',
                      margin: 0
                    }}>
                      {relatedQA.answer.length > 120 
                        ? relatedQA.answer.substring(0, 120).trim() + '...' 
                        : relatedQA.answer}
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
  const qas = getAllQAs()
  
  return {
    paths: qas.map((qa) => ({
      params: { slug: qa.slug },
    })),
    fallback: false, // false is required for static export (output: 'export')
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const qa = await getQABySlug(slug)

  if (!qa) {
    return {
      notFound: true,
    }
  }

  // Get related Q&As (excluding current, limit to 4)
  const allQAs = getAllQAs()
  const relatedQAs = allQAs
    .filter((q) => q.slug !== qa.slug)
    .slice(0, 4)

  // Pre-format dates and clean titles to ensure consistency
  const formattedQADate = format(new Date(qa.date), 'MMMM dd, yyyy')
  const formattedRelatedQAs = relatedQAs.map((q) => ({
    ...q,
    formattedDate: format(new Date(q.date), 'MMMM dd, yyyy'),
    cleanTitle: cleanTitle(q.question),
  }))

  return {
    props: {
      qa: {
        ...qa,
        formattedDate: formattedQADate,
        cleanTitle: cleanTitle(qa.question),
      },
      relatedQAs: formattedRelatedQAs,
    }
    // Note: revalidate removed - not compatible with static export (output: 'export')
    // Pages will regenerate on each build (when new Q&As are added via GitHub Actions)
  }
}

