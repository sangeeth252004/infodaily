import Head from 'next/head'
import Link from 'next/link'
import { getSiteMetadata, getCanonicalUrl } from '../lib/seo'

export default function About() {
  const siteMeta = getSiteMetadata()
  const canonicalUrl = getCanonicalUrl('/about')
  const pageTitle = `About | ${siteMeta.name}`

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content="Learn about InfoDaily, a trusted source for insights on technology, AI, health, and education. Our editorial team delivers clear, accessible, and reliable information." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content="Learn about InfoDaily, a trusted source for insights on technology, AI, health, and education." />
        <meta property="og:site_name" content={siteMeta.name} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content="Learn about InfoDaily, a trusted source for insights on technology, AI, health, and education." />
      </Head>

      <div className="container">
        <header className="header">
          <Link href="/" className="site-title">InfoDaily</Link>
        </header>

        <main className="main">
          <div className="post-container">
            <nav className="breadcrumb">
              <Link href="/" className="breadcrumb-link">Home</Link>
              <span className="breadcrumb-separator">/</span>
              <span>About</span>
            </nav>

            <article className="post">
              <header className="post-header">
                <h1 className="post-title">About InfoDaily</h1>
              </header>

              <div className="post-content">
                <p>
                  InfoDaily is an informational website dedicated to providing clear, accessible, and reliable insights on topics that matter to readers in their daily lives. Our platform focuses on delivering well-structured content across key areas including technology, artificial intelligence, health, and education.
                </p>

                <h2>Our Mission</h2>
                <p>
                  Our mission is to make complex information understandable. We believe that knowledge should be accessible to everyone, regardless of their background or expertise level. The editorial team at InfoDaily works to break down complicated topics into clear, readable content that helps readers make informed decisions and stay updated with current developments.
                </p>

                <h2>What We Cover</h2>
                <p>
                  InfoDaily covers four main focus areas. In technology, we explore the latest trends, tools, and innovations that shape how we work and live. Our artificial intelligence content examines how AI is transforming various industries and what it means for individuals and businesses. Our health section provides informational content about wellness, lifestyle, and general health topics. In education, we share insights about learning methods, educational technology, and skills development.
                </p>

                <h2>Editorial Approach</h2>
                <p>
                  Our editorial team prioritizes clarity, accuracy, and accessibility. Every piece of content is crafted to be informative and easy to understand. We avoid exaggerated claims and focus on providing balanced, factual information. Our goal is to build trust with our readers by maintaining high editorial standards and ensuring that all content serves an educational purpose.
                </p>

                <h2>Content Philosophy</h2>
                <p>
                  All content on InfoDaily is created with the reader in mind. We understand that information overload is a real challenge, which is why we aim to deliver concise yet comprehensive articles. Our editorial team works to ensure that every article provides value, whether it's explaining a new technology, discussing health and wellness topics, or exploring educational opportunities.
                </p>

                <h2>Transparency and Trust</h2>
                <p>
                  Transparency is fundamental to how we operate. We clearly communicate what InfoDaily is and what readers can expect from our content. We believe in building long-term relationships with our audience through consistent, reliable information. Our editorial guidelines ensure that all content maintains professional standards while remaining approachable and useful.
                </p>

                <p>
                  Thank you for visiting InfoDaily. We hope you find our content valuable and informative. If you have questions, feedback, or suggestions, please feel free to reach out through our contact page.
                </p>
              </div>
            </article>
          </div>
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

