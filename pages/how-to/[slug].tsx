import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getAllHowTos, getHowToBySlug, HowTo } from '../../lib/howto'
import { format } from 'date-fns'
import { cleanTitle, getCanonicalUrl, getSiteMetadata } from '../../lib/seo'

interface HowToPageProps {
  howto: HowTo & { content: string; formattedDate: string; cleanTitle: string }
}

export default function HowToPage({ howto }: HowToPageProps) {
  const siteMeta = getSiteMetadata()
  const cleanHowToTitle = howto.cleanTitle
  const pageTitle = `${cleanHowToTitle} | InfoDaily`
  const canonicalUrl = getCanonicalUrl(`/how-to/${howto.slug}`)
  const publishedDate = new Date(howto.date).toISOString()
  
  // Extract steps from content for HowTo schema
  // This is a simplified extraction - in production you might want more sophisticated parsing
  const stepMatches = howto.content.match(/<h[23][^>]*>(\d+\.?\s*[^<]+)<\/h[23]>/gi) || []
  const steps = stepMatches.slice(0, 7).map((match, index) => {
    const text = match.replace(/<[^>]+>/g, '').replace(/^\d+\.?\s*/, '').trim()
    return {
      '@type': 'HowToStep',
      position: index + 1,
      name: text,
      text: text,
    }
  })

  // Generate JSON-LD structured data for HowTo
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: cleanHowToTitle,
    description: howto.description,
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
    ...(steps.length > 0 && { step: steps }),
  }

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={howto.description} />
        <meta name="keywords" content={howto.keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={cleanHowToTitle} />
        <meta property="og:description" content={howto.description} />
        <meta property="og:site_name" content={siteMeta.name} />
        <meta property="article:published_time" content={publishedDate} />
        <meta property="article:modified_time" content={publishedDate} />
        <meta property="article:author" content="InfoDaily Editorial Team" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={cleanHowToTitle} />
        <meta name="twitter:description" content={howto.description} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      </Head>

      <div className="container">
        <header className="header">
          <nav className="main-nav">
            <Link href="/" className="site-title">InfoDaily</Link>
            <div className="nav-links">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/how-to" className="nav-link active">How-To</Link>
            </div>
          </nav>
        </header>

        <main className="post-container">
          <nav className="breadcrumb">
            <Link href="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <span>{cleanHowToTitle}</span>
          </nav>

          <article className="post">
            <header className="post-header">
              <h1 className="post-title">{cleanHowToTitle}</h1>
              <div className="post-meta">
                <time dateTime={howto.date}>
                  Published {howto.formattedDate}
                </time>
              </div>
            </header>

            <div 
              className="post-content"
              dangerouslySetInnerHTML={{ __html: howto.content }}
            />
          </article>
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
  const howtos = getAllHowTos()
  
  return {
    paths: howtos.map((howto) => ({
      params: { slug: howto.slug },
    })),
    fallback: false, // false is required for static export (output: 'export')
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string
  const howto = await getHowToBySlug(slug)

  if (!howto) {
    return {
      notFound: true,
    }
  }

  // Pre-format dates and clean titles to ensure consistency
  const formattedHowToDate = format(new Date(howto.date), 'MMMM dd, yyyy')

  return {
    props: {
      howto: {
        ...howto,
        formattedDate: formattedHowToDate,
        cleanTitle: cleanTitle(howto.title),
      },
    }
    // Note: revalidate removed - not compatible with static export (output: 'export')
    // Pages will regenerate on each build (when new how-to articles are added via GitHub Actions)
  }
}

