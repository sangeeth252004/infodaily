import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getAllHowTos, HowTo } from '../../lib/howto'
import { format } from 'date-fns'
import { getSiteMetadata, getCanonicalUrl, cleanTitle } from '../../lib/seo'

interface HowToIndexProps {
  howtos: HowTo[]
}

export default function HowToIndex({ howtos }: HowToIndexProps) {
  const siteMeta = getSiteMetadata()
  const canonicalUrl = getCanonicalUrl('/how-to')

  return (
    <>
      <Head>
        {/* Primary Meta */}
        <title>How-To Guides | InfoDaily</title>
        <meta name="title" content="How-To Guides | InfoDaily" />
        <meta name="description" content="Step-by-step guides to fix common software errors, app issues, and technical problems." />
        <meta name="keywords" content="how-to, error fix, troubleshooting, software errors, technical guides" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content="How-To Guides | InfoDaily" />
        <meta property="og:description" content="Step-by-step guides to fix common software errors, app issues, and technical problems." />
        <meta property="og:site_name" content={siteMeta.name} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="How-To Guides | InfoDaily" />
        <meta name="twitter:description" content="Step-by-step guides to fix common software errors, app issues, and technical problems." />
      </Head>

      <div className="container">
        <header className="header">
          <nav className="main-nav">
            <Link href="/" className="site-title">InfoDaily</Link>
            <div className="nav-links">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/how-to" className="nav-link active">How-To</Link>
            </div>
          </nav>
        </header>

        <main className="main">
          <h1 className="section-title">How-To Guides</h1>
          <p className="section-description" style={{ marginBottom: '2rem', color: '#6b7280' }}>
            Step-by-step guides to fix common software errors, app issues, and technical problems.
          </p>

          <div className="posts-grid">
            {howtos.map(howto => {
              const howtoDate = new Date(howto.date)
              const formattedDate = format(howtoDate, 'MMM dd, yyyy')

              return (
                <article key={howto.slug} className="post-card">
                  <Link
                    href={`/how-to/${howto.slug}`}
                    className="post-card-link"
                  >
                    <div className="post-card-content">
                      <h2 className="post-title">
                        {cleanTitle(howto.title)}
                      </h2>
                      <p className="post-description">
                        {howto.description}
                      </p>
                      <div className="post-meta">
                        <time
                          dateTime={howto.date}
                          title={format(howtoDate, 'MMMM dd, yyyy HH:mm')}
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

          {howtos.length === 0 && (
            <div className="empty-state">
              <p>
                No how-to guides available yet. Guides are published automatically.
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
  const howtos = getAllHowTos()

  return {
    props: {
      howtos: howtos.sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    },
  }
}

