/**
 * Generate sitemap.xml at build time
 * This script is run during the build process to create an up-to-date sitemap
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug: data.slug || slug,
        date: data.date || new Date().toISOString(),
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    return -1;
  });
}

function getAllHowTos() {
  const howtoDirectory = path.join(process.cwd(), 'how-to');
  
  if (!fs.existsSync(howtoDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(howtoDirectory);
  const allHowTosData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      const fullPath = path.join(howtoDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug: data.slug || slug,
        date: data.date || new Date().toISOString(),
      };
    });

  return allHowTosData.sort((a, b) => {
    if (a.date < b.date) return 1;
    return -1;
  });
}

function getAllQAs() {
  const qaDirectory = path.join(process.cwd(), 'qa');
  
  if (!fs.existsSync(qaDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(qaDirectory);
  const allQAsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      const fullPath = path.join(qaDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug: data.slug || slug,
        date: data.date || new Date().toISOString(),
      };
    });

  return allQAsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    return -1;
  });
}

function getAllMeanings() {
  const meaningDirectory = path.join(process.cwd(), 'meaning');
  
  if (!fs.existsSync(meaningDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(meaningDirectory);
  const allMeaningsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      const fullPath = path.join(meaningDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug: data.slug || slug,
        date: data.date || new Date().toISOString(),
      };
    });

  return allMeaningsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    return -1;
  });
}

function getAllComparisons() {
  const vsDirectory = path.join(process.cwd(), 'vs');
  
  if (!fs.existsSync(vsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(vsDirectory);
  const allComparisonsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      const fullPath = path.join(vsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug: data.slug || slug,
        date: data.date || new Date().toISOString(),
      };
    });

  return allComparisonsData.sort((a, b) => {
    if (a.date < b.date) return 1;
    return -1;
  });
}

function generateSitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  const posts = getAllPosts();
  const howtos = getAllHowTos();
  const qas = getAllQAs();
  const meanings = getAllMeanings();
  const comparisons = getAllComparisons();
  
  const staticPages = [
    { url: baseUrl, priority: '1.0', changefreq: 'daily', lastmod: new Date().toISOString() },
    { url: `${baseUrl}/about`, priority: '0.7', changefreq: 'monthly', lastmod: new Date().toISOString() },
    { url: `${baseUrl}/privacy-policy`, priority: '0.6', changefreq: 'monthly', lastmod: new Date().toISOString() },
    { url: `${baseUrl}/contact`, priority: '0.6', changefreq: 'monthly', lastmod: new Date().toISOString() },
    { url: `${baseUrl}/disclaimer`, priority: '0.6', changefreq: 'monthly', lastmod: new Date().toISOString() },
    { url: `${baseUrl}/posts`, priority: '0.9', changefreq: 'daily', lastmod: new Date().toISOString() },
    { url: `${baseUrl}/how-to`, priority: '0.9', changefreq: 'daily', lastmod: new Date().toISOString() },
    { url: `${baseUrl}/qa`, priority: '0.9', changefreq: 'daily', lastmod: new Date().toISOString() },
    { url: `${baseUrl}/meaning`, priority: '0.9', changefreq: 'daily', lastmod: new Date().toISOString() },
    { url: `${baseUrl}/vs`, priority: '0.9', changefreq: 'daily', lastmod: new Date().toISOString() },
    { url: `${baseUrl}/calculators`, priority: '0.8', changefreq: 'monthly', lastmod: new Date().toISOString() }
  ];
  
  const postPages = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastmod: post.date,
    priority: '0.8',
    changefreq: 'weekly'
  }));
  
  const howtoPages = howtos.map((howto) => ({
    url: `${baseUrl}/how-to/${howto.slug}`,
    lastmod: howto.date,
    priority: '0.8',
    changefreq: 'weekly'
  }));
  
  const qaPages = qas.map((qa) => ({
    url: `${baseUrl}/qa/${qa.slug}`,
    lastmod: qa.date,
    priority: '0.8',
    changefreq: 'weekly'
  }));
  
  const meaningPages = meanings.map((meaning) => ({
    url: `${baseUrl}/meaning/${meaning.slug}`,
    lastmod: meaning.date,
    priority: '0.8',
    changefreq: 'weekly'
  }));
  
  const comparisonPages = comparisons.map((comparison) => ({
    url: `${baseUrl}/vs/${comparison.slug}`,
    lastmod: comparison.date,
    priority: '0.8',
    changefreq: 'weekly'
  }));
  
  const allPages = [...staticPages, ...postPages, ...howtoPages, ...qaPages, ...meaningPages, ...comparisonPages];
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod || new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
  console.log('✅ Sitemap generated successfully!');
}

if (require.main === module) {
  generateSitemap();
}

module.exports = { generateSitemap };

