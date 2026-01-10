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

function generateSitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
  const posts = getAllPosts();
  
  const staticPages = [
    { url: baseUrl, priority: '1.0', changefreq: 'daily', lastmod: new Date().toISOString() }
  ];
  
  const postPages = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastmod: post.date,
    priority: '0.8',
    changefreq: 'weekly'
  }));
  
  const allPages = [...staticPages, ...postPages];
  
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

