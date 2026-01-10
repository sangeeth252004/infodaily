# InfoDaily - Fully Automated Next.js Blog

🤖 **Zero-maintenance automated blog** that generates and publishes SEO-optimized content **3 times per day** using GitHub Actions.

## ✨ Features

- ✅ **Fully Automated** - No manual intervention required
- ✅ **100% Free** - Uses free GitHub Actions and template-based content generation
- ✅ **SEO Optimized** - Auto-generated sitemaps, meta tags, and structured content
- ✅ **AdSense Safe** - Content follows Google AdSense policies
- ✅ **Static Site** - Fast, secure, and deployable to Vercel/Netlify
- ✅ **Auto-Detection** - Next.js automatically detects new markdown files
- ✅ **3x Daily Posts** - Scheduled via GitHub Actions cron jobs

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Generate a Test Post (Local)

```bash
npm run generate-post
```

This will create a new markdown file in the `posts/` directory.

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your blog.

### 4. Build for Production

```bash
npm run build
```

The build process automatically generates the sitemap.

## 🔧 Setup for Automated Publishing

### GitHub Actions Setup

1. **Push to GitHub** - Make sure your repository is on GitHub

2. **Enable GitHub Actions** - Actions are enabled by default. The workflow file is at:
   ```
   .github/workflows/auto-post.yml
   ```

3. **Configure Permissions** (if needed):
   - Go to Repository Settings → Actions → General
   - Under "Workflow permissions", select "Read and write permissions"
   - This allows the action to commit new posts

4. **Verify Cron Schedule**:
   The workflow runs 3 times daily at:
   - 6:00 AM UTC
   - 2:00 PM UTC
   - 10:00 PM UTC
   
   You can modify these times in `.github/workflows/auto-post.yml`

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Vercel will automatically deploy on every push to `main`
3. When GitHub Actions commits new posts, Vercel auto-deploys

### Configure Domain (Optional)

1. Update `NEXT_PUBLIC_BASE_URL` in your environment variables
2. Update `public/robots.txt` with your actual domain
3. Update sitemap generation in `scripts/generateSitemap.js`

## 📝 Content Generation

### How It Works

1. **Topic Selection**: Randomly picks from 5 categories (technology, AI, finance, health, education)
2. **Title Selection**: Chooses a random SEO-optimized title from the category
3. **Content Generation**: Creates 1200-1500 word articles using template-based system
4. **File Creation**: Saves as `YYYY-MM-DD-slug.md` in the `posts/` directory
5. **Auto-Commit**: GitHub Actions commits and pushes the new file

### Content Quality

- **SEO Optimized**: Includes meta descriptions, keywords, and structured headings
- **AdSense Safe**: No clickbait, no misleading content, proper formatting
- **Unique Content**: Each post is unique (no duplicates)
- **Professional**: Well-structured articles with introduction, sections, and conclusion

### Customization

To customize topics or titles, edit `scripts/generatePost.js`:
- Modify the `TOPICS` object to add/change categories
- Adjust content templates in the helper functions
- Change word count targets (currently 1200-1500 words)

## 📁 Project Structure

```
infodaily/
├── .github/
│   └── workflows/
│       └── auto-post.yml          # GitHub Actions automation
├── pages/
│   ├── _app.tsx                   # Next.js app wrapper
│   ├── index.tsx                  # Blog listing page
│   └── posts/
│       └── [slug].tsx             # Individual post page
├── posts/                         # Generated markdown files (auto-created)
├── scripts/
│   ├── generatePost.js            # Content generation script
│   └── generateSitemap.js         # Sitemap generator
├── lib/
│   └── posts.ts                   # Post parsing utilities
├── styles/
│   └── globals.css                # Global styles
└── public/
    └── robots.txt                 # SEO robots file
```

## 🔍 SEO Features

- ✅ Auto-generated sitemap.xml (updates on build)
- ✅ Meta tags for all pages
- ✅ Open Graph tags for social sharing
- ✅ Structured headings (H1, H2, H3)
- ✅ Canonical URLs
- ✅ robots.txt configuration
- ✅ Semantic HTML structure

## 🛡️ AdSense Safety

The content generator follows Google AdSense policies:

- ✅ No clickbait titles
- ✅ No misleading content
- ✅ Factual, informative articles
- ✅ Proper paragraph spacing
- ✅ No prohibited topics (adult, gambling, illegal)
- ✅ Original content (template-based, but unique each time)

## 🧪 Testing GitHub Actions

You can manually trigger the workflow:

1. Go to your GitHub repository
2. Click "Actions" tab
3. Select "Automated Blog Post Generator"
4. Click "Run workflow"
5. Select branch and click "Run workflow"

## 📊 Monitoring

- Check GitHub Actions tab for workflow runs
- View generated posts in the `posts/` directory
- Monitor Vercel deployments for auto-deploys

## 🔄 Troubleshooting

### Posts not generating?

- Check GitHub Actions logs for errors
- Verify workflow has write permissions
- Ensure `posts/` directory exists (auto-created if missing)

### Build fails?

- Run `npm install` to ensure dependencies are installed
- Check Node.js version (requires 18+)
- Verify markdown files have proper frontmatter

### Sitemap not updating?

- Run `npm run generate-sitemap` manually
- Check `public/sitemap.xml` exists after build
- Verify `NEXT_PUBLIC_BASE_URL` is set correctly

## 📄 License

MIT License - Feel free to use this project for your automated blog!

## 🤝 Contributing

This is an automated system, but improvements are welcome! Focus areas:
- Additional content templates
- More topic categories
- Enhanced SEO features
- Better content variation

---

**Built with Next.js, GitHub Actions, and zero maintenance required!** 🚀

