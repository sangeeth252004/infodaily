import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getAllQAs, QA } from '../../lib/qa'
import { format } from 'date-fns'
import { getSiteMetadata, getCanonicalUrl, cleanTitle } from '../../lib/seo'

interface QAIndexProps {
  qas: QA[]
}

export default function QAIndex({ qas }: QAIndexProps) {
  const siteMeta = getSiteMetadata()
  const canonicalUrl = getCanonicalUrl('/qa')

  return (
    <>
      <Head>
        {/* Primary Meta */}
        <title>Questions & Answers | InfoDaily</title>
        <meta name="title" content="Questions & Answers | InfoDaily" />
        <meta name="description" content="Find clear, accurate answers to common questions about technology, AI, and digital topics." />
        <meta name="keywords" content="questions, answers, Q&A, FAQ, technology questions, AI questions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content="Questions & Answers | InfoDaily" />
        <meta property="og:description" content="Find clear, accurate answers to common questions about technology, AI, and digital topics." />
        <meta property="og:site_name" content={siteMeta.name} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Questions & Answers | InfoDaily" />
        <meta name="twitter:description" content="Find clear, accurate answers to common questions about technology, AI, and digital topics." />
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

        <main className="main" style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
          <h1 className="section-title">Questions & Answers</h1>
          <p className="section-description" style={{ marginBottom: '2rem', color: '#6b7280', fontSize: '1.125rem' }}>
            Find clear, accurate answers to common questions about technology, AI, and digital topics. 
            Our Q&A section provides educational, fact-based information to help you understand complex topics.
          </p>

          <div className="posts-grid">
            {qas.map(qa => {
              const qaDate = new Date(qa.date)
              const formattedDate = format(qaDate, 'MMM dd, yyyy')
              const answerPreview = qa.answer.length > 150 
                ? qa.answer.substring(0, 150).trim() + '...' 
                : qa.answer

              return (
                <article key={qa.slug} className="post-card">
                  <Link
                    href={`/qa/${qa.slug}`}
                    className="post-card-link"
                  >
                    <div className="post-card-content">
                      <h2 className="post-title">
                        {cleanTitle(qa.question)}
                      </h2>
                      <p className="post-description">
                        {answerPreview}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                        <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Read full answer →</span>
                        <time
                          dateTime={qa.date}
                          title={format(qaDate, 'MMMM dd, yyyy HH:mm')}
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

          {qas.length === 0 && (
            <div className="empty-state">
              <p>
                No Q&A entries available yet. Questions and answers are published automatically.
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
  const qas = getAllQAs()

  return {
    props: {
      qas: qas.sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    },
  }
}

