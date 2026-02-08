import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Script from "next/script"
import { getAllPosts, getPostBySlug, Post } from '../../lib/posts'
import { format } from 'date-fns'
import { cleanTitle, getCanonicalUrl, getSiteMetadata } from '../../lib/seo'

interface PostPageProps {
  post: Post & { content: string; formattedDate: string; cleanTitle: string }
  relatedPosts: Array<Post & { formattedDate: string; cleanTitle: string }>
}

export default function PostPage({ post, relatedPosts }: PostPageProps) {
  const siteMeta = getSiteMetadata()
  const cleanPostTitle = post.cleanTitle
  const pageTitle = `${cleanPostTitle} | InfoDaily`
  const canonicalUrl = getCanonicalUrl(`/posts/${post.slug}`)
  const publishedDate = new Date(post.date).toISOString()

  const blogPostSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: cleanPostTitle,
    description: post.description,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: { '@type': 'Organization', name: 'InfoDaily Editorial Team' },
    publisher: { '@type': 'Organization', name: siteMeta.name },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    articleSection: post.category,
  }

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={canonicalUrl} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
        />
      </Head>

      <div className="container">
        <header className="header">
          <Link href="/" className="site-title">InfoDaily</Link>
        </header>

        <main className="post-container">
          <nav className="breadcrumb">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span>{cleanPostTitle}</span>
          </nav>

          <article className="post">
            <header className="post-header">
              <h1 className="post-title">{cleanPostTitle}</h1>
              <div className="post-meta">
                <time dateTime={post.date}>
                  Published {post.formattedDate}
                </time>
              </div>
            </header>

            {/* Native Ad */}
            <Script
              src="https://pl28673593.effectivegatecpm.com/5ff153651c7fdf5d0d4b535a6916b968/invoke.js"
              strategy="afterInteractive"
            />
            <div id="container-5ff153651c7fdf5d0d4b535a6916b968"></div>

            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {relatedPosts.length > 0 && (
            <section className="related-articles">
              <h2 className="related-articles-title">Related Articles</h2>
              <div className="related-articles-grid">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.slug} className="related-article-card">
                    <Link href={`/posts/${relatedPost.slug}`} className="related-article-link">
                      <h3 className="related-article-title">{relatedPost.cleanTitle}</h3>
                      <p className="related-article-description">{relatedPost.description}</p>
                      <time dateTime={relatedPost.date}>
                        {relatedPost.formattedDate}
                      </time>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </main>

        <footer className="footer">
          <div className="footer-content">
            <nav className="footer-links">
              <Link href="/about">About</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/disclaimer">Disclaimer</Link>
            </nav>

            {/* Footer Banner Ad */}
            <Script id="banner-ad" strategy="afterInteractive">
              {`
                atOptions = {
                  'key' : '5f7e346e8fb8603f923a6e838626468d',
                  'format' : 'iframe',
                  'height' : 60,
                  'width' : 468,
                  'params' : {}
                };
              `}
            </Script>
            <Script
              src="//www.highperformanceformat.com/5f7e346e8fb8603f923a6e838626468d/invoke.js"
              strategy="afterInteractive"
            />

            <p className="footer-copyright">
              © {new Date().getFullYear()} InfoDaily
            </p>
          </div>
        </footer>
      </div>
    </>
  )
}
