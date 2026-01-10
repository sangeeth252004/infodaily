import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts, getPostBySlug, Post } from '../../lib/posts'
import { format } from 'date-fns'

interface PostPageProps {
  post: Post & { content: string }
}

export default function PostPage({ post }: PostPageProps) {
  return (
    <>
      <Head>
        <title>{post.title} | InfoDaily</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="InfoDaily" />
        <meta property="article:section" content={post.category} />
        <link rel="canonical" href={`https://yourdomain.com/posts/${post.slug}`} />
      </Head>

      <div className="container">
        <header className="header">
          <Link href="/" className="back-link">← Back to Home</Link>
          <h1 className="site-title">InfoDaily</h1>
        </header>

        <main className="post-container">
          <article className="post">
            <header className="post-header">
              <span className="post-category-badge">{post.category}</span>
              <h1 className="post-title">{post.title}</h1>
              <div className="post-meta">
                <time dateTime={post.date}>
                  {format(new Date(post.date), 'MMMM dd, yyyy')}
                </time>
              </div>
            </header>

            <div 
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>
        </main>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} InfoDaily. All rights reserved.</p>
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

  return {
    props: {
      post,
    }
    // Note: revalidate removed - not compatible with static export (output: 'export')
    // Pages will regenerate on each build (when new posts are added via GitHub Actions)
  }
}

