# Vercel Deployment Guide for Static Export

## Important: Configuration for Next.js Static Export

When deploying a Next.js app with `output: 'export'` to Vercel, you need to configure it as a **static site**, not as a Next.js application.

## Step-by-Step Deployment

### Option 1: Via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**: https://vercel.com
2. **Import Project**: Click "Add New" → "Project" → Import your GitHub repository
3. **Configure Project Settings**:
   
   **CRITICAL SETTINGS:**
   - **Framework Preset**: Select **"Other"** (NOT "Next.js")
   - **Root Directory**: `./` (default, usually leave blank)
   - **Build Command**: `npm run build`
   - **Output Directory**: `out`
   - **Install Command**: `npm install` (default)

4. **Environment Variables**:
   - Add: `NEXT_PUBLIC_BASE_URL` = `https://your-project.vercel.app` (or your custom domain)

5. **Deploy**: Click "Deploy"

### Option 2: Via Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name? (your choice)
# - In which directory is your code? ./
# - Override settings? N
```

Then configure in dashboard:
- Go to Project Settings → General
- Change Framework Preset to "Other"
- Set Output Directory to `out`

## Why "Other" Instead of "Next.js"?

When you use `output: 'export'` in Next.js:
- Next.js generates **pure static HTML/CSS/JS** files
- No server-side features (no API routes, no ISR, no SSR)
- All files are in the `out/` directory
- It's essentially a static site, not a Next.js app

If you select "Next.js" preset:
- Vercel expects Next.js server runtime
- Looks for `routes-manifest.json` and other server files
- These don't exist in static exports
- **Result**: Deployment fails with "routes-manifest.json not found" error

## Verification

After deployment:
1. ✅ Site should load at `https://your-project.vercel.app`
2. ✅ All pages should work (homepage, blog posts)
3. ✅ Sitemap should be accessible at `/sitemap.xml`
4. ✅ No server-side errors in Vercel logs

## Troubleshooting

### Error: "routes-manifest.json not found"
**Solution**: Change Framework Preset to "Other" in Vercel dashboard

### Error: "Build succeeded but site doesn't load"
**Solution**: Verify Output Directory is set to `out` in project settings

### Error: "404 on all pages"
**Solution**: Check that `trailingSlash: true` is in `next.config.js` (already set)

### Build succeeds but deployment fails
**Solution**: 
1. Check Vercel build logs
2. Verify `output: 'export'` is in `next.config.js`
3. Ensure no ISR (`revalidate`) is used (already fixed)

## Updating Configuration

If you need to change settings later:
1. Go to Vercel Dashboard → Your Project → Settings → General
2. Update Framework, Build Command, or Output Directory
3. Redeploy (or push a new commit to trigger auto-deploy)

## Automatic Deployments

Once configured correctly:
- ✅ Every push to `main` branch triggers auto-deploy
- ✅ GitHub Actions commits new posts → Vercel auto-deploys
- ✅ No manual intervention needed

---

**Remember**: Static export = Static site = Use "Other" framework preset! 🚀






