import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getAllPosts, Post } from '../lib/posts'
import { format } from 'date-fns'

interface HomeProps {
  posts: Post[]
}

export default function Home({ posts }: HomeProps) {
  return (
    <>
      <Head>
        <title>InfoDaily - Automated Tech & AI Blog</title>
        <meta name="description" content="Stay updated with the latest technology, AI, finance, health, and education insights. Automated daily blog posts with SEO-optimized content." />
        <meta name="keywords" content="technology, AI, finance, health, education, blog, automated content" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="InfoDaily - Automated Tech & AI Blog" />
        <meta property="og:description" content="Stay updated with the latest technology, AI, finance, health, and education insights." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://yourdomain.com" />
      </Head>

      <div className="container">
        <header className="header">
          <h1 className="title">InfoDaily</h1>
          <p className="subtitle">Automated Technology & AI Blog</p>
        </header>

        <main className="main">
          <div className="posts-grid">
            {posts.map((post) => (
              <article key={post.slug} className="post-card">
                <Link href={`/posts/${post.slug}`}>
                  <div className="post-content">
                    <span className="post-category">{post.category}</span>
                    <h2 className="post-title">{post.title}</h2>
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
          <p>&copy; {new Date().getFullYear()} InfoDaily. All rights reserved.</p>
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

