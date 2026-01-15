import Head from 'next/head'
import Link from 'next/link'
import { ReactNode } from 'react'
import { getCanonicalUrl, getSiteMetadata } from '../../lib/seo'

type Props = {
  title: string
  description: string
  canonicalPath: string
  h1: string
  intro?: string
  children: ReactNode
}

export default function CalculatorLayout({
  title,
  description,
  canonicalPath,
  h1,
  intro,
  children,
}: Props) {
  const siteMeta = getSiteMetadata()
  const canonicalUrl = getCanonicalUrl(canonicalPath)

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="title" content={title} />
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content={siteMeta.name} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Head>

      <div className="container">
        <header className="header">
          <nav className="main-nav">
            <Link href="/" className="site-title">
              InfoDaily
            </Link>
            <div className="nav-links">
              <Link href="/" className="nav-link">
                Home
              </Link>
              <Link href="/how-to" className="nav-link">
                How-To
              </Link>
              <Link href="/calculators" className="nav-link active">
                Calculators
              </Link>
            </div>
          </nav>
        </header>

        <main className="main">
          <h1 className="section-title">{h1}</h1>
          {intro ? (
            <p className="section-description" style={{ marginBottom: '2rem', color: '#6b7280' }}>
              {intro}
            </p>
          ) : null}
          {children}
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


