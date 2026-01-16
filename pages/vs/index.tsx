import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getAllComparisons, Comparison } from '../../lib/vs'
import { format } from 'date-fns'
import { getSiteMetadata, getCanonicalUrl, cleanTitle } from '../../lib/seo'

interface VSIndexProps {
  comparisons: Comparison[]
}

export default function VSIndex({ comparisons }: VSIndexProps) {
  const siteMeta = getSiteMetadata()
  const canonicalUrl = getCanonicalUrl('/vs')

  return (
    <>
      <Head>
        {/* Primary Meta */}
        <title>Comparisons & Differences | InfoDaily</title>
        <meta name="title" content="Comparisons & Differences | InfoDaily" />
        <meta name="description" content="Clear, objective comparisons to help you choose between technologies, tools, and services. Side-by-side analysis you can trust." />
        <meta name="keywords" content="comparisons, vs, differences, technology comparison, software comparison, tool comparison" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content="Comparisons & Differences | InfoDaily" />
        <meta property="og:description" content="Clear, objective comparisons to help you choose between technologies, tools, and services. Side-by-side analysis you can trust." />
        <meta property="og:site_name" content={siteMeta.name} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Comparisons & Differences | InfoDaily" />
        <meta name="twitter:description" content="Clear, objective comparisons to help you choose between technologies, tools, and services. Side-by-side analysis you can trust." />
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

        <main className="main" style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
          <h1 className="section-title">Comparisons & Differences</h1>
          <p className="section-description" style={{ marginBottom: '2rem', color: '#6b7280', fontSize: '1.125rem' }}>
            Clear, objective comparisons to help you choose between technologies, tools, and services. 
            Side-by-side analysis to make informed decisions.
          </p>

          <div className="posts-grid">
            {comparisons.map(comparison => {
              const comparisonDate = new Date(comparison.date)
              const formattedDate = format(comparisonDate, 'MMM dd, yyyy')
              const summaryPreview = comparison.summary.length > 150 
                ? comparison.summary.substring(0, 150).trim() + '...' 
                : comparison.summary

              return (
                <article key={comparison.slug} className="post-card">
                  <Link
                    href={`/vs/${comparison.slug}`}
                    className="post-card-link"
                  >
                    <div className="post-card-content">
                      <h2 className="post-title" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                        {cleanTitle(comparison.title)}
                      </h2>
                      <p className="post-description">
                        {summaryPreview}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                        <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>View comparison →</span>
                        <time
                          dateTime={comparison.date}
                          title={format(comparisonDate, 'MMMM dd, yyyy HH:mm')}
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

          {comparisons.length === 0 && (
            <div className="empty-state">
              <p>
                No comparisons available yet. Comparisons are published automatically.
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
  const comparisons = getAllComparisons()

  return {
    props: {
      comparisons: comparisons.sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    },
  }
}

