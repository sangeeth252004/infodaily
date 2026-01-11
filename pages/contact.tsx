import Head from 'next/head'
import Link from 'next/link'
import { getSiteMetadata, getCanonicalUrl } from '../lib/seo'

export default function Contact() {
  const siteMeta = getSiteMetadata()
  const canonicalUrl = getCanonicalUrl('/contact')
  const pageTitle = `Contact | ${siteMeta.name}`

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content="Contact InfoDaily. We welcome your feedback, questions, and suggestions about our content." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content="Contact InfoDaily. We welcome your feedback, questions, and suggestions." />
        <meta property="og:site_name" content={siteMeta.name} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content="Contact InfoDaily. We welcome your feedback, questions, and suggestions." />
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
              <span>Contact</span>
            </nav>

            <article className="post">
              <header className="post-header">
                <h1 className="post-title">Contact InfoDaily</h1>
              </header>

              <div className="post-content">
                <p>
                  We value your feedback and are here to help. Whether you have questions about our content, suggestions for improvement, or corrections to share, we welcome your input.
                </p>

                <h2>Get in Touch</h2>
                <p>
                  If you would like to reach out to the InfoDaily team, please send us an email. We make every effort to review and respond to inquiries in a timely manner. While we cannot guarantee an immediate response, we appreciate your patience and will do our best to address your message.
                </p>

                <p>
                  <strong>Email:</strong> contact@infodaily.com
                </p>

                <h2>What We Welcome</h2>
                <p>
                  We appreciate hearing from our readers. Feel free to contact us if you have questions about our articles, feedback about the content we publish, or suggestions for topics you would like to see covered. We also welcome corrections if you notice any inaccuracies in our content. Our editorial team reviews all feedback carefully and considers it when planning future content and updates.
                </p>

                <h2>Editorial Inquiries</h2>
                <p>
                  If you have questions about our editorial process, content policies, or how we create our articles, we're happy to provide information. We believe in transparency about our approach to content creation and are committed to maintaining high editorial standards.
                </p>

                <h2>Corrections and Updates</h2>
                <p>
                  Accuracy is important to us. If you believe you have found an error in any of our content, please let us know. Include as much detail as possible, such as the article title, the specific information in question, and any reliable sources that support the correction. Our editorial team will review all correction requests and make updates as appropriate.
                </p>

                <h2>Topic Suggestions</h2>
                <p>
                  We're always interested in learning what topics our readers want to explore. If you have suggestions for articles on technology, artificial intelligence, health, or education, we'd love to hear from you. While we cannot guarantee that every suggestion will result in an article, we carefully consider all ideas and factor reader interests into our content planning.
                </p>

                <h2>Response Time</h2>
                <p>
                  Please note that due to the volume of inquiries we receive, we may not be able to respond to every message individually. However, we read all messages and take your feedback into account. For urgent matters or specific questions, we recommend including clear details in your message to help us provide the most helpful response possible.
                </p>

                <p>
                  Thank you for being part of the InfoDaily community. Your engagement and feedback help us continue to provide valuable, informative content.
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

