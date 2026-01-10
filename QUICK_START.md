# 🚀 Quick Start Guide

## Installation (2 minutes)

```bash
npm install
```

## Test Locally

```bash
# Generate a test post
npm run generate-post

# View your blog
npm run dev
# Open http://localhost:3000
```

## Deploy (5 minutes)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Automated blog setup"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Enable GitHub Actions
- Go to: **Settings → Actions → General**
- Set **Workflow permissions** to: **Read and write permissions**
- Save

### 3. Deploy to Vercel
- Visit [vercel.com](https://vercel.com)
- Import your GitHub repo
- **IMPORTANT**: Set Framework Preset to **"Other"** (NOT "Next.js")
- Set Output Directory to: `out`
- Set Build Command to: `npm run build`
- Add env var: `NEXT_PUBLIC_BASE_URL` = your domain
- Deploy!

**Why "Other"?** We use static export (`output: 'export'`), so it's a static site, not a Next.js server app. See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for details.

## That's It! 🎉

The blog will automatically:
- ✅ Generate posts 3x daily (6 AM, 2 PM, 10 PM UTC)
- ✅ Commit to GitHub
- ✅ Deploy to Vercel
- ✅ Update sitemap
- ✅ Zero maintenance required!

## Manual Test

To test the automation immediately:
1. Go to GitHub → Actions tab
2. Click "Automated Blog Post Generator"
3. Click "Run workflow"
4. Watch the magic happen! ✨

---

**Need detailed setup?** See [SETUP.md](./SETUP.md)  
**Questions?** See [README.md](./README.md)

