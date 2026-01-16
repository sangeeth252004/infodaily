import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getAllMeanings, Meaning } from '../../lib/meaning'
import { format } from 'date-fns'
import { getSiteMetadata, getCanonicalUrl, cleanTitle } from '../../lib/seo'

interface MeaningIndexProps {
  meanings: Meaning[]
}

export default function MeaningIndex({ meanings }: MeaningIndexProps) {
  const siteMeta = getSiteMetadata()
  const canonicalUrl = getCanonicalUrl('/meaning')

  return (
    <>
      <Head>
        {/* Primary Meta */}
        <title>Meanings & Definitions | InfoDaily</title>
        <meta name="title" content="Meanings & Definitions | InfoDaily" />
        <meta name="description" content="Clear, simple explanations of technology, AI, and digital terms. Dictionary-style definitions you can trust." />
        <meta name="keywords" content="meanings, definitions, dictionary, glossary, technology terms, AI terms, software definitions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content="Meanings & Definitions | InfoDaily" />
        <meta property="og:description" content="Clear, simple explanations of technology, AI, and digital terms. Dictionary-style definitions you can trust." />
        <meta property="og:site_name" content={siteMeta.name} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Meanings & Definitions | InfoDaily" />
        <meta name="twitter:description" content="Clear, simple explanations of technology, AI, and digital terms. Dictionary-style definitions you can trust." />
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

        <main className="main" style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
          <h1 className="section-title">Meanings & Definitions</h1>
          <p className="section-description" style={{ marginBottom: '2rem', color: '#6b7280', fontSize: '1.125rem' }}>
            Clear, simple explanations of technology, AI, and digital terms. 
            Dictionary-style definitions to help you understand complex concepts.
          </p>

          <div className="posts-grid">
            {meanings.map(meaning => {
              const meaningDate = new Date(meaning.date)
              const formattedDate = format(meaningDate, 'MMM dd, yyyy')
              const definitionPreview = meaning.definition.length > 120 
                ? meaning.definition.substring(0, 120).trim() + '...' 
                : meaning.definition

              return (
                <article key={meaning.slug} className="post-card">
                  <Link
                    href={`/meaning/${meaning.slug}`}
                    className="post-card-link"
                  >
                    <div className="post-card-content">
                      <h2 className="post-title" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                        {cleanTitle(meaning.term)}
                      </h2>
                      <p className="post-description">
                        {definitionPreview}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                        <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Read meaning →</span>
                        <time
                          dateTime={meaning.date}
                          title={format(meaningDate, 'MMMM dd, yyyy HH:mm')}
                          style={{ color: '#9ca3af', fontSize: '0.875rem' }}
                        >
                          {formattedDate}
                        </time>
                      </div>
                    </div>
                  </Link>
                </article>
              )
            })}
          </div>

          {meanings.length === 0 && (
            <div className="empty-state">
              <p>
                No definitions available yet. Terms and meanings are published automatically.
              </p>
            </div>
          )}
        </main>

        <footer className="footer">
          <div className="footer-content">
            <nav className="footer-links">
              <Link href="/about" className="footer-link">
                About
              </Link>
              <Link href="/privacy-policy" className="footer-link">
                Privacy Policy
              </Link>
              <Link href="/contact" className="footer-link">
                Contact
              </Link>
              <Link href="/disclaimer" className="footer-link">
                Disclaimer
              </Link>
            </nav>
            <p className="footer-copyright">
              © {new Date().getFullYear()} InfoDaily. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const meanings = getAllMeanings()

  return {
    props: {
      meanings: meanings.sort((a, b) => {
        // Sort alphabetically by term
        return a.term.localeCompare(b.term, undefined, { sensitivity: 'base' })
      }),
    },
  }
}

