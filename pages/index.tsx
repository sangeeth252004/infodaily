import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts, Post } from '../lib/posts'
import { format } from 'date-fns'
import { getSiteMetadata, getCanonicalUrl, cleanTitle } from '../lib/seo'

interface HomeProps {
  posts: Post[]
}

export default function Home({ posts }: HomeProps) {
  const siteMeta = getSiteMetadata()
  const canonicalUrl = getCanonicalUrl('/')

  // JSON-LD for SEO
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMeta.name,
    url: siteMeta.url,
    description: siteMeta.description,
    publisher: {
      '@type': 'Organization',
      name: siteMeta.name,
    },
  }

  return (
    <>
      <Head>
        {/* Primary Meta */}
        <title>{siteMeta.title}</title>
        <meta name="title" content={siteMeta.title} />
        <meta name="description" content={siteMeta.description} />
        <meta
          name="keywords"
          content="latest news, breaking news, India news, world news, technology news, business news, education news, health news"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={siteMeta.title} />
        <meta property="og:description" content={siteMeta.description} />
        <meta property="og:site_name" content={siteMeta.name} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteMeta.title} />
        <meta name="twitter:description" content={siteMeta.description} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </Head>

      <div className="container">
        <header className="header">
          <nav className="main-nav">
            <Link href="/" className="site-title">InfoDaily</Link>
            <div className="nav-links">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/how-to" className="nav-link">How-To</Link>
              <Link href="/calculators" className="nav-link">Calculators</Link>
            </div>
          </nav>
          <div className="hero-section">
            <h1 className="title">InfoDaily</h1>
            <p className="subtitle">Latest Verified News Updates</p>
          </div>
        </header>

        <main className="main">
          <h2 className="section-title">Latest News</h2>

          <div className="posts-grid">
            {posts
              .filter(post => {
                const postDate = new Date(post.date)
                const hoursAgo =
                  (Date.now() - postDate.getTime()) / (1000 * 60 * 60)
                return hoursAgo <= 24
              })
              .slice(0, 20)
              .map(post => {
                const postDate = new Date(post.date)
                const hoursAgo = Math.floor(
                  (Date.now() - postDate.getTime()) / (1000 * 60 * 60)
                )

                const timeDisplay =
                  hoursAgo < 24
                    ? `${hoursAgo} hour${hoursAgo !== 1 ? 's' : ''} ago`
                    : format(postDate, 'MMM dd, yyyy')

                return (
                  <article key={post.slug} className="post-card">
                    <Link
                      href={`/posts/${post.slug}`}
                      className="post-card-link"
                    >
                      <div className="post-card-content">
                        {/* CATEGORY REMOVED – ALL ARE NEWS */}
                        <h2 className="post-title">
                          {cleanTitle(post.title)}
                        </h2>
                        <p className="post-description">
                          {post.description}
                        </p>
                        <div className="post-meta">
                          <time
                            dateTime={post.date}
                            title={format(
                              postDate,
                              'MMMM dd, yyyy HH:mm'
                            )}
                          >
                            {timeDisplay}
                          </time>
                        </div>
                      </div>
                    </Link>
                  </article>
                )
              })}
          </div>

          {posts.length === 0 && (
            <div className="empty-state">
              <p>
                No news available yet. Articles are published automatically from
                verified trending sources.
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
  const posts = getAllPosts()

  return {
    props: {
      posts: posts.sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    },
  }
}
