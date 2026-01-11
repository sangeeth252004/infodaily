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
  
  // Generate JSON-LD structured data for WebSite
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
        {/* Primary Meta Tags */}
        <title>{siteMeta.title}</title>
        <meta name="title" content={siteMeta.title} />
        <meta name="description" content={siteMeta.description} />
        <meta name="keywords" content="technology, AI, health, education, blog, insights, articles" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={siteMeta.title} />
        <meta property="og:description" content={siteMeta.description} />
        <meta property="og:site_name" content={siteMeta.name} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteMeta.title} />
        <meta name="twitter:description" content={siteMeta.description} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </Head>

      <div className="container">
        <header className="header">
          <div className="hero-section">
            <h1 className="title">InfoDaily</h1>
            <p className="subtitle">Trusted insights on Technology, AI, Health & Education</p>
          </div>
        </header>

        <main className="main">
          <div className="posts-grid">
            {posts.map((post) => (
              <article key={post.slug} className="post-card">
                <Link href={`/posts/${post.slug}`} className="post-card-link">
                  <div className="post-card-content">
                    <span className="post-category">{post.category}</span>
                    <h2 className="post-title">{cleanTitle(post.title)}</h2>
                    <p className="post-description">{post.description}</p>
                    <div className="post-meta">
                      <time dateTime={post.date}>
                        {format(new Date(post.date), 'MMMM dd, yyyy')}
                      </time>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="empty-state">
              <p>No posts available yet. Posts are generated automatically 3 times per day.</p>
            </div>
          )}
        </main>

        <footer className="footer">
          <div className="footer-content">
            <nav className="footer-links">
              <Link href="/about" className="footer-link">About</Link>
              <Link href="/privacy-policy" className="footer-link">Privacy Policy</Link>
              <Link href="/contact" className="footer-link">Contact</Link>
              <Link href="/disclaimer" className="footer-link">Disclaimer</Link>
            </nav>
            <p className="footer-copyright">&copy; {new Date().getFullYear()} InfoDaily. All rights reserved.</p>
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
      posts: posts.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    }
    // Note: revalidate removed - not compatible with static export (output: 'export')
    // Pages will regenerate on each build (when new posts are added via GitHub Actions)
  }
}

