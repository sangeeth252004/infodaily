import Head from 'next/head'
import Link from 'next/link'
import { getSiteMetadata, getCanonicalUrl } from '../lib/seo'

export default function Disclaimer() {
  const siteMeta = getSiteMetadata()
  const canonicalUrl = getCanonicalUrl('/disclaimer')
  const pageTitle = `Disclaimer | ${siteMeta.name}`

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content="InfoDaily Disclaimer. Important information about the informational nature of our content and limitations of liability." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content="InfoDaily Disclaimer. Important information about the informational nature of our content." />
        <meta property="og:site_name" content={siteMeta.name} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content="InfoDaily Disclaimer. Important information about the informational nature of our content." />
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
              <span>Disclaimer</span>
            </nav>

            <article className="post">
              <header className="post-header">
                <h1 className="post-title">Disclaimer</h1>
              </header>

              <div className="post-content">
                <p>
                  The information provided on InfoDaily is for general informational purposes only. Please read this disclaimer carefully before using our website and content.
                </p>

                <h2>Informational Content Only</h2>
                <p>
                  All content published on InfoDaily is intended to provide general information and educational insights. Our articles are created to inform and educate readers on various topics including technology, artificial intelligence, health, and education. The content is not intended to serve as professional advice, nor should it be used as a substitute for professional consultation.
                </p>

                <h2>Not Professional Advice</h2>
                <p>
                  The information on InfoDaily does not constitute medical, legal, financial, or other professional advice. Our content is not designed to diagnose, treat, cure, or prevent any condition or disease. It should not be used as a replacement for professional medical advice, diagnosis, or treatment. Similarly, our technology and business content does not constitute professional consulting, legal, or financial advice.
                </p>

                <h2>Health and Medical Content</h2>
                <p>
                  Health-related content on InfoDaily is provided for informational purposes only. It is not intended as medical advice, diagnosis, or treatment. Always seek the advice of qualified health providers with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website. If you think you may have a medical emergency, call your doctor or emergency services immediately.
                </p>

                <h2>Technology and AI Content</h2>
                <p>
                  Our technology and artificial intelligence content is intended to inform readers about current trends, developments, and general information in these fields. This information should not be considered as professional technical advice, implementation guidance, or business recommendations. For specific technical implementations, business decisions, or professional consultation, please consult with qualified professionals in the relevant field.
                </p>

                <h2>Education Content</h2>
                <p>
                  Educational content on InfoDaily is provided to share general insights about learning, educational technology, and skills development. This information is not intended to replace formal education, professional training, or educational consultation. For specific educational needs or decisions, consult with qualified educational professionals.
                </p>

                <h2>Accuracy and Updates</h2>
                <p>
                  While we strive to provide accurate and up-to-date information, we make no representations or warranties about the completeness, accuracy, reliability, or availability of the information on our website. Information may become outdated, and we do not guarantee that all content reflects the most current developments or research. We reserve the right to update, modify, or remove content at any time without notice.
                </p>

                <h2>Third-Party Links</h2>
                <p>
                  Our website may contain links to external websites operated by third parties. These links are provided for convenience and informational purposes only. We do not endorse or assume responsibility for the content, privacy policies, or practices of these external websites. Your use of third-party websites is at your own risk.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                  InfoDaily and its editorial team shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our website or content. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses, even if we have been advised of the possibility of such damages.
                </p>

                <h2>Use at Your Own Risk</h2>
                <p>
                  Your use of InfoDaily and reliance on any information provided is solely at your own risk. You are responsible for evaluating the accuracy, completeness, and usefulness of any information available on this website. Always consult with appropriate professionals before making decisions based on information you find on our website or any other source.
                </p>

                <h2>Professional Consultation Recommended</h2>
                <p>
                  For matters requiring professional expertise, we strongly encourage you to consult with qualified professionals. This includes medical professionals for health concerns, legal professionals for legal matters, financial advisors for financial decisions, and technical experts for technology implementation. Professional consultation is essential for making informed decisions in these areas.
                </p>

                <p>
                  By using InfoDaily, you acknowledge that you have read, understood, and agree to be bound by this disclaimer. If you do not agree with any part of this disclaimer, please do not use our website.
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

