import Head from 'next/head'
import Link from 'next/link'
import { getSiteMetadata, getCanonicalUrl } from '../lib/seo'

export default function PrivacyPolicy() {
  const siteMeta = getSiteMetadata()
  const canonicalUrl = getCanonicalUrl('/privacy-policy')
  const pageTitle = `Privacy Policy | ${siteMeta.name}`

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content="InfoDaily Privacy Policy. Learn about how we handle data, cookies, and user privacy on our website." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content="InfoDaily Privacy Policy. Learn about how we handle data, cookies, and user privacy." />
        <meta property="og:site_name" content={siteMeta.name} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content="InfoDaily Privacy Policy. Learn about how we handle data, cookies, and user privacy." />
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
              <span>Privacy Policy</span>
            </nav>

            <article className="post">
              <header className="post-header">
                <h1 className="post-title">Privacy Policy</h1>
                <div className="post-meta">
                  <time>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                </div>
              </header>

              <div className="post-content">
                <p>
                  This Privacy Policy explains how InfoDaily handles information when you visit our website. We are committed to being transparent about our practices and respecting your privacy.
                </p>

                <h2>Information We Collect</h2>
                <p>
                  InfoDaily does not actively collect personal information from visitors. We do not require registration, account creation, or the submission of personal details to access our content. You can browse our website without providing any personal information.
                </p>

                <h2>Third-Party Services</h2>
                <p>
                  Our website may use third-party services that collect certain information automatically. These services include advertising networks, analytics providers, and content delivery services. When you visit InfoDaily, these third-party services may receive certain technical information such as your IP address, browser type, device information, and pages you visit.
                </p>

                <h2>Cookies and Tracking Technologies</h2>
                <p>
                  Third-party services used on InfoDaily may place cookies or similar tracking technologies on your device. These technologies help these services understand how visitors interact with websites, deliver relevant content, and measure the effectiveness of advertising.
                </p>

                <p>
                  Google AdSense, which may display advertisements on our website, uses cookies to serve ads based on your visits to InfoDaily and other websites. These cookies enable Google to show you advertisements that may be relevant to your interests. You can learn more about how Google uses cookies and how to manage them by visiting Google's Privacy & Terms page.
                </p>

                <h2>Analytics</h2>
                <p>
                  We may use analytics services to understand how visitors use our website. These services help us understand which pages are most popular, how long visitors spend on our site, and similar aggregate information. Analytics data is typically collected in an aggregated and anonymous format, which means it does not personally identify individual visitors.
                </p>

                <h2>How We Use Information</h2>
                <p>
                  Any information collected through third-party services is used primarily to improve the website experience, deliver relevant content, and support the operation of our website through advertising and analytics services. We do not sell personal information to third parties.
                </p>

                <h2>Your Choices</h2>
                <p>
                  You have several options for managing cookies and tracking technologies. Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies or to alert you when cookies are being sent. However, disabling cookies may affect your experience on our website and other websites you visit.
                </p>

                <p>
                  You can also opt out of personalized advertising from Google AdSense by visiting Google's Ads Settings. Additionally, you can use the Digital Advertising Alliance's opt-out page to manage your preferences across multiple advertising networks.
                </p>

                <h2>Links to Other Websites</h2>
                <p>
                  Our website may contain links to external websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any website you visit.
                </p>

                <h2>Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. When we make changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically to stay informed about how we handle information.
                </p>

                <h2>Contact Us</h2>
                <p>
                  If you have questions about this Privacy Policy or our privacy practices, please contact us through our contact page. We will do our best to respond to your inquiries in a timely manner.
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

