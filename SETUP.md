# Setup Instructions - InfoDaily Automated Blog

## 🚀 Quick Setup (5 minutes)

### Step 1: Clone and Install

```bash
# Install dependencies
npm install
```

### Step 2: Test Locally

```bash
# Generate a test post
npm run generate-post

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see your blog!

### Step 3: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Automated blog setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 4: Configure GitHub Actions

1. Go to your repository on GitHub
2. Navigate to **Settings → Actions → General**
3. Under **Workflow permissions**, select:
   - ✅ **Read and write permissions**
   - ✅ **Allow GitHub Actions to create and approve pull requests**
4. Save changes

### Step 5: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Import Project"**
3. Select your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `out` (default)
5. Add Environment Variable:
   - Name: `NEXT_PUBLIC_BASE_URL`
   - Value: `https://yourdomain.vercel.app` (or your custom domain)
6. Click **Deploy**

### Step 6: Verify Automation

1. Go to **Actions** tab in GitHub
2. You should see "Automated Blog Post Generator" workflow
3. Click **"Run workflow"** to test manually
4. Check that:
   - ✅ Post is generated in `posts/` directory
   - ✅ New commit is created
   - ✅ Vercel automatically deploys the update

## 📅 Schedule Configuration

The workflow runs **3 times per day** at:
- **6:00 AM UTC** (cron: `0 6 * * *`)
- **2:00 PM UTC** (cron: `0 14 * * *`)
- **10:00 PM UTC** (cron: `0 22 * * *`)

To change the schedule, edit `.github/workflows/auto-post.yml`:

```yaml
schedule:
  - cron: '0 6 * * *'   # Hour Minute Day Month DayOfWeek
```

**Cron Format**: `minute hour day month day-of-week`
- `0 6 * * *` = 6:00 AM every day
- `0 */8 * * *` = Every 8 hours
- `0 9,15,21 * * *` = 9 AM, 3 PM, 9 PM

## 🔧 Customization

### Change Topics/Categories

Edit `scripts/generatePost.js`:

```javascript
const TOPICS = {
  your_category: [
    'Your Topic Title 1',
    'Your Topic Title 2',
    // Add more titles
  ]
};
```

### Adjust Content Length

In `scripts/generatePost.js`, modify the word count check:

```javascript
// Current: 1200 words minimum
if (wordCount < 1200) {
  // Add more content
}
```

### Change Post Frequency

Edit `.github/workflows/auto-post.yml` cron schedules (see above).

### Customize Styling

Edit `styles/globals.css` to match your brand.

## 🐛 Troubleshooting

### Posts Not Generating?

**Check GitHub Actions Logs:**
1. Go to Actions tab
2. Click on the failed workflow run
3. Check error messages

**Common Issues:**
- ❌ **Permission Error**: Ensure workflow has write permissions (Step 4 above)
- ❌ **Node Version**: GitHub Actions uses Node 20 (configured in workflow)
- ❌ **Missing Dependencies**: Workflow runs `npm install` automatically

### Build Fails on Vercel?

**Check Build Logs:**
1. Go to Vercel dashboard
2. Click on failed deployment
3. View build logs

**Common Issues:**
- ❌ **Missing Environment Variables**: Add `NEXT_PUBLIC_BASE_URL`
- ❌ **TypeScript Errors**: Run `npm run lint` locally to check
- ❌ **Out Directory**: Ensure `next.config.js` has `output: 'export'`

### Sitemap Not Updating?

**Manual Generation:**
```bash
npm run generate-sitemap
```

**Check:**
- `public/sitemap.xml` exists after build
- `NEXT_PUBLIC_BASE_URL` is set correctly
- Sitemap is accessible at `/sitemap.xml`

### Duplicate Posts?

The script checks for duplicates automatically, but if you see duplicates:
1. Check `posts/` directory for files with same slug
2. Delete duplicates manually
3. Future runs will prevent duplicates

## 📊 Monitoring

### GitHub Actions Status
- ✅ Green checkmark = Success
- ⚠️ Yellow circle = In progress
- ❌ Red X = Failed (check logs)

### Vercel Deployments
- Automatic deployment on every push
- Check deployment logs in Vercel dashboard
- Monitor build times and success rates

### Content Quality
- Review generated posts in `posts/` directory
- Adjust templates in `scripts/generatePost.js` if needed
- Ensure AdSense compliance (no clickbait, proper content)

## 🔐 Security Notes

- ✅ No API keys required (100% free)
- ✅ No backend server needed
- ✅ All content generated locally
- ✅ Static site = secure by default
- ⚠️ Keep `GITHUB_TOKEN` secret (auto-provided by GitHub)

## 📈 SEO Checklist

After setup, verify:

- ✅ Sitemap accessible at `/sitemap.xml`
- ✅ Robots.txt at `/robots.txt`
- ✅ Meta tags on all pages (check page source)
- ✅ Canonical URLs set correctly
- ✅ Open Graph tags for social sharing
- ✅ Structured headings (H1, H2, H3)
- ✅ Mobile-responsive design

## 🎯 Next Steps

1. **Custom Domain**: Add custom domain in Vercel settings
2. **Google Search Console**: Submit sitemap
3. **Google Analytics**: Add tracking code (optional)
4. **AdSense**: Apply when ready (content must be original and compliant)
5. **Social Media**: Share your automated blog!

## 💡 Pro Tips

1. **Monitor First Few Posts**: Review quality before full automation
2. **Adjust Templates**: Customize content templates for your niche
3. **SEO Optimization**: Add more keywords/topics relevant to your audience
4. **Backup Strategy**: Posts are in git, but consider regular backups
5. **Performance**: Static site = fast loading = better SEO

---

**Need Help?** Check the main README.md or GitHub Issues.

**Ready to automate?** The system will start generating posts on the next scheduled run! 🚀

