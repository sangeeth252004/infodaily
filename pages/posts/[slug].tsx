import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
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
  
  // Generate JSON-LD structured data for BlogPosting
  const blogPostSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: cleanPostTitle,
    description: post.description,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: {
      '@type': 'Organization',
      name: 'InfoDaily Editorial Team',
    },
    publisher: {
      '@type': 'Organization',
      name: siteMeta.name,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    articleSection: post.category,
  }

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={cleanPostTitle} />
        <meta property="og:description" content={post.description} />
        <meta property="og:site_name" content={siteMeta.name} />
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:modified_time" content={publishedDate} />
        <meta property="article:author" content="InfoDaily Editorial Team" />
        <meta property="article:section" content={post.category} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={cleanPostTitle} />
        <meta name="twitter:description" content={post.description} />

        {/* JSON-LD Structured Data */}
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
            <span
  className="post-category-badge visually-hidden"
  aria-hidden="true"
>
  {post.category}
</span>

              <h1 className="post-title">{cleanPostTitle}</h1>
              <div className="post-meta">
                <time dateTime={post.date}>
                  Published {post.formattedDate}
                </time>
              </div>
            </header>

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
                      <span className="related-article-category">{relatedPost.category}</span>
                      <h3 className="related-article-title">{relatedPost.cleanTitle}</h3>
                      <p className="related-article-description">{relatedPost.description}</p>
                      <time className="related-article-date" dateTime={relatedPost.date}>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts()
  
  return {
    paths: posts.map((post) => ({
      params: { slug: post.slug },
    })),
    fallback: false, // false is required for static export (output: 'export')
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const post = await getPostBySlug(slug) // getPostBySlug is async, need to await

  if (!post) {
    return {
      notFound: true,
    }
  }

  // Get related posts (same category, excluding current post, limit to 4)
  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 4)

  // If not enough posts in same category, fill with recent posts
  if (relatedPosts.length < 4) {
    const recentPosts = allPosts
      .filter((p) => p.slug !== post.slug && !relatedPosts.some((rp) => rp.slug === p.slug))
      .slice(0, 4 - relatedPosts.length)
    relatedPosts.push(...recentPosts)
  }

  // Pre-format dates and clean titles to ensure consistency
  const formattedPostDate = format(new Date(post.date), 'MMMM dd, yyyy')
  const formattedRelatedPosts = relatedPosts.slice(0, 4).map((p) => ({
    ...p,
    formattedDate: format(new Date(p.date), 'MMMM dd, yyyy'),
    cleanTitle: cleanTitle(p.title),
  }))

  return {
    props: {
      post: {
        ...post,
        formattedDate: formattedPostDate,
        cleanTitle: cleanTitle(post.title),
      },
      relatedPosts: formattedRelatedPosts,
    }
    // Note: revalidate removed - not compatible with static export (output: 'export')
    // Pages will regenerate on each build (when new posts are added via GitHub Actions)
  }
}
