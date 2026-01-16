import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getAllMeanings, getMeaningBySlug, Meaning } from '../../lib/meaning'
import { format } from 'date-fns'
import { cleanTitle, getCanonicalUrl, getSiteMetadata } from '../../lib/seo'

interface MeaningPageProps {
  meaning: Meaning & { content: string; formattedDate: string; cleanTitle: string }
  relatedMeanings: Array<Meaning & { formattedDate: string; cleanTitle: string }>
}

export default function MeaningPage({ meaning, relatedMeanings }: MeaningPageProps) {
  const siteMeta = getSiteMetadata()
  const cleanMeaningTitle = meaning.cleanTitle
  const pageTitle = `Meaning of ${cleanMeaningTitle} | InfoDaily`
  const canonicalUrl = getCanonicalUrl(`/meaning/${meaning.slug}`)
  const publishedDate = new Date(meaning.date).toISOString()
  
  // Generate JSON-LD structured data for DefinedTerm
  const definedTermSchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: cleanMeaningTitle,
    description: meaning.definition,
    dateCreated: publishedDate,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'InfoDaily',
      publisher: {
        '@type': 'Organization',
        name: siteMeta.name,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
  }

  // Get meta description from definition (first 150 characters)
  const metaDescription = meaning.definition.length > 150 
    ? meaning.definition.substring(0, 150).trim() + '...' 
    : meaning.definition

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={meaning.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={`Meaning of ${cleanMeaningTitle}`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:site_name" content={siteMeta.name} />
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:modified_time" content={publishedDate} />
        <meta property="article:author" content="InfoDaily" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Meaning of ${cleanMeaningTitle}`} />
        <meta name="twitter:description" content={metaDescription} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }}
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
              <Link href="/meaning" className="nav-link active">Meanings</Link>
              <Link href="/vs" className="nav-link">Comparisons</Link>
            </div>
          </nav>
        </header>

        <main className="post-container">
          <nav className="breadcrumb">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <Link href="/meaning" className="breadcrumb-link">Meanings</Link>
            <span className="breadcrumb-separator">/</span>
            <span>{cleanMeaningTitle}</span>
          </nav>

          <article className="post">
            <header className="post-header">
              <h1 className="post-title">{cleanMeaningTitle}</h1>
              <div className="post-meta">
                <time dateTime={meaning.date}>
                  Published {meaning.formattedDate}
                </time>
              </div>
            </header>

            {/* Definition Section - Dictionary-style at the top */}
            <div className="post-content" style={{ marginTop: '2rem' }}>
              <div style={{ 
                backgroundColor: '#f9fafb', 
                padding: '1.5rem', 
                borderRadius: '8px', 
                marginBottom: '2rem',
                borderLeft: '4px solid #10b981'
              }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem', color: '#111827', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Definition
                </h2>
                <p style={{ fontSize: '1.25rem', lineHeight: '1.75', color: '#374151', fontWeight: 400 }}>
                  {meaning.definition}
                </p>
              </div>

              {/* Detailed Explanation */}
              <div 
                className="post-content"
                dangerouslySetInnerHTML={{ __html: meaning.content }}
              />
            </div>
          </article>

          {/* Related Terms */}
          {relatedMeanings.length > 0 && (
            <section style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem', color: '#111827' }}>
                Related Terms
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {relatedMeanings.map((relatedMeaning) => (
                  <Link
                    key={relatedMeaning.slug}
                    href={`/meaning/${relatedMeaning.slug}`}
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
                      {relatedMeaning.cleanTitle}
                    </h3>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: '#6b7280',
                      margin: 0
                    }}>
                      {relatedMeaning.definition.length > 120 
                        ? relatedMeaning.definition.substring(0, 120).trim() + '...' 
                        : relatedMeaning.definition}
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
  const meanings = getAllMeanings()
  
  return {
    paths: meanings.map((meaning) => ({
      params: { slug: meaning.slug },
    })),
    fallback: false, // false is required for static export (output: 'export')
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const meaning = await getMeaningBySlug(slug)

  if (!meaning) {
    return {
      notFound: true,
    }
  }

  // Get related meanings (excluding current, limit to 4)
  const allMeanings = getAllMeanings()
  const relatedMeanings = allMeanings
    .filter((m) => m.slug !== meaning.slug)
    .slice(0, 4)

  // Pre-format dates and clean titles to ensure consistency
  const formattedMeaningDate = format(new Date(meaning.date), 'MMMM dd, yyyy')
  const formattedRelatedMeanings = relatedMeanings.map((m) => ({
    ...m,
    formattedDate: format(new Date(m.date), 'MMMM dd, yyyy'),
    cleanTitle: cleanTitle(m.term),
  }))

  return {
    props: {
      meaning: {
        ...meaning,
        formattedDate: formattedMeaningDate,
        cleanTitle: cleanTitle(meaning.term),
      },
      relatedMeanings: formattedRelatedMeanings,
    }
    // Note: revalidate removed - not compatible with static export (output: 'export')
    // Pages will regenerate on each build (when new meanings are added via GitHub Actions)
  }
}

