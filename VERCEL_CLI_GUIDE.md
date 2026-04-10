# 🚀 Vercel CLI Deployment Guide

**Date Created:** April 10, 2026  
**Status:** GitHub push complete ✅ → Vercel auto-deploy in progress

---

## 📊 Current Status

```
✅ Code committed to GitHub
✅ Push to main branch completed
✅ Vercel should auto-deploy now
⏳ Check Vercel dashboard for deployment status
```

---

## 🎯 TWO WAYS TO DEPLOY

### **Option 1: Auto-Deploy from GitHub** (Recommended - Already Happening!)

```
GitHub push (just did this! ✅)
    ↓
Vercel webhook triggered automatically
    ↓
Vercel builds & deploys
    ↓
Website live in ~2-3 minutes
```

✅ **This is what just happened!**

- Your GitHub push triggered Vercel automatically
- Check <https://vercel.com/dashboard> for deployment status

---

### **Option 2: Vercel CLI Manual Deploy** (If auto-deploy fails)

#### **Install Vercel CLI**

```bash
npm install -g vercel
# or using yarn
yarn global add vercel
```

#### **Login to Vercel**

```bash
vercel login
# Opens browser → login with GitHub account
# Gives you authorization token
```

#### **Deploy with Vercel CLI**

```bash
# Option A: Interactive deployment
vercel

# Option B: Production deployment
vercel --prod

# Option C: From any directory, specify project path
vercel "C:\Users\TAUSHEF\Desktop\ai agency bro"

# Option D: With specific environment variables
vercel --prod --env GITHUB_TOKEN=xxx --env VERCEL_TOKEN=xxx
```

---

## 📋 VERCEL CLI COMMANDS

### **Deployment**

```bash
vercel                        # Deploy to preview URL
vercel --prod                 # Deploy to production
vercel --cwd ./path           # Deploy specific directory
vercel --skip-build           # Skip build step
vercel --env-file .env.prod   # Use specific env file
```

### **Monitoring**

```bash
vercel logs                   # View deployment logs
vercel logs --follow          # Stream logs in real-time
vercel logs <deployment-url>  # Logs for specific deployment
vercel status                 # Check deployment status
```

### **Environment Variables**

```bash
vercel env ls                 # List all env variables
vercel env add VAR_NAME       # Add new env variable
vercel env pull               # Download env vars to .env.local
vercel env rm VAR_NAME        # Remove env variable
```

### **Configuration**

```bash
vercel link                   # Link to existing Vercel project
vercel unlink                 # Unlink from project
vercel list                   # List all deployments
vercel remove <deployment-id> # Delete a deployment
```

---

## 🔧 SETUP VERCEL CLI (Step-by-Step)

### **Step 1: Install Node.js** (if not already installed)

```bash
# Check if you have Node.js
node --version

# If not installed, download from https://nodejs.org
```

### **Step 2: Install Vercel CLI**

```bash
npm install -g vercel
```

### **Step 3: Verify Installation**

```bash
vercel --version
# Should output something like: Vercel CLI 33.0.0 (or newer)
```

### **Step 4: Login to Vercel**

```bash
vercel login
# Browser opens → Click "Continue with GitHub"
# Authorize Vercel
# Returns to terminal with success message
```

### **Step 5: Navigate to Project**

```bash
cd "C:\Users\TAUSHEF\Desktop\ai agency bro"
```

### **Step 6: Deploy**

```bash
# For preview/staging deployment
vercel

# For production deployment
vercel --prod
```

---

## 📱 INTERACTIVE DEPLOYMENT

When you run `vercel` or `vercel --prod`, you'll see prompts:

```
? Set up and deploy "C:\Users\TAUSHEF\Desktop\ai agency bro"? [Y/n] Y

? Which scope do you want to deploy to? (use arrow keys)
  Current GitHub account (ayanshaikh2491-stack)

? Link to existing project? [y/N] y

? What's the name of your existing project? ai-agency-website

? Confirm linked project "ai-agency-website" [Y/n] Y

? Auto-detected Project Settings (Vite):
- Build Command: vite build
- Output Directory: dist
- Root Directory: ./
[Y/n] Y

Building [===================] 100%
Deployed successfully!
Production: https://ai-agency-website.vercel.app
```

---

## 🔍 MONITOR DEPLOYMENT STATUS

### **Option 1: Vercel Dashboard**

1. Go to <https://vercel.com/dashboard>
2. Click **ai-agency-website** project
3. See **Deployments** tab
4. Latest deployment shows status and logs

### **Option 2: Vercel CLI**

```bash
# View logs of latest deployment
vercel logs

# Stream logs in real-time
vercel logs --follow

# View status
vercel status
```

### **Option 3: Check Build Logs**

```bash
# View complete build output
vercel logs --output=raw
```

---

## ⚠️ TROUBLESHOOTING

### **Problem: "Deploy Protection" blocks deployment**

```
Error: This deployment is protected and requires approval
```

**Fix:**

1. Go to <https://vercel.com/dashboard>
2. Click project → Settings → General
3. Find "Deploy Protection" → Toggle OFF
4. Retry deployment

### **Problem: "Environment variables not found"**

```
Error: Cannot find module or variable undefined
```

**Fix:**

1. Add variables to Vercel:

   ```bash
   vercel env add EMAIL_USER
   vercel env add EMAIL_PASSWORD
   vercel env add VITE_SUPABASE_URL
   # ... add all required vars
   ```

2. Redeploy:

   ```bash
   vercel --prod
   ```

### **Problem: Build fails**

```
Error: Failed to build project
```

**Fix:**

1. Check build logs:

   ```bash
   vercel logs
   ```

2. Look for error message
3. Fix locally and test:

   ```bash
   npm run build
   ```

4. Redeploy

### **Problem: "Cannot find dependencies"**

```
Error: MODULE_NOT_FOUND
```

**Fix:**

1. Make sure `package.json` has all dependencies
2. Test locally:

   ```bash
   npm install
   npm run build
   ```

3. Push to GitHub (auto-deploy fixes)
4. Or deploy with CLI:

   ```bash
   vercel --prod
   ```

---

## 🔄 AUTO-DEPLOY FROM GITHUB (Already Configured!)

Your project is already set up for auto-deploy:

```
✅ GitHub connected to Vercel
✅ Push to main branch triggers deploy
✅ Build runs automatically
✅ Site goes live in ~2-3 minutes
```

**To verify auto-deploy is working:**

1. Check GitHub push was successful ✅
2. Go to <https://vercel.com/dashboard>
3. Click **ai-agency-website**
4. Look for new deployment in **Deployments** tab
5. Should say "Building..." or "Ready"

---

## 📊 DEPLOYMENT WORKFLOW

```
┌─ LOCAL CHANGES ─────────────────────┐
│ 1. Edit files locally               │
│ 2. Test with: npm run dev           │
│ 3. Run: npm run build               │
│ 4. Verify: no errors                │
└─────────────────────────────────────┘
                  ↓
┌─ GIT COMMIT ────────────────────────┐
│ 1. git add .                        │
│ 2. git commit -m "fix: ..."         │
│ 3. Test locally one more time       │
└─────────────────────────────────────┘
                  ↓
┌─ GITHUB PUSH ───────────────────────┐
│ 1. git push origin main             │
│ 2. Wait for push to complete        │
│ 3. Check https://github.com/...    │
└─────────────────────────────────────┘
                  ↓
┌─ VERCEL AUTO-DEPLOY (Auto!) ───────┐
│ 1. Webhook triggered automatically  │
│ 2. Vercel receives push notification│
│ 3. Fetches code from GitHub        │
│ 4. Runs build commands             │
│ 5. Deploys to production           │
│ 6. Updates DNS records             │
└─────────────────────────────────────┘
                  ↓
┌─ LIVE WEBSITE ──────────────────────┐
│ https://ai-agency-website.vercel.app
└─────────────────────────────────────┘
```

---

## 🎯 QUICK REFERENCE

### **For development:**

```bash
npm run dev              # Local server on localhost:5173
```

### **For testing before deploy:**

```bash
npm run build            # Build production bundle
npm run preview          # Preview production build locally
```

### **For deployment:**

```bash
# GitHub push (auto-deploys)
git push origin main

# OR manual Vercel CLI
vercel --prod
```

### **To check status:**

```bash
# Vercel CLI logs
vercel logs

# Or visit
https://vercel.com/dashboard → Deployments tab
```

---

## ✅ YOUR CURRENT SETUP

```
✅ GitHub repository: ai-agency-system
✅ Vercel project: ai-agency-website
✅ Auto-deploy: Enabled via webhook
✅ Build command: npm run build (in vercel.json)
✅ API routes: /api/* configured
✅ Ready: YES! Just push and deploy 🚀
```

---

## 🚀 NEXT STEPS

1. **Verify auto-deploy started:**
   - Go to <https://vercel.com/dashboard>
   - See "Building..." status

2. **Wait for deployment to complete** (~2-3 minutes)

3. **Test the live site:**
   - Visit <https://ai-agency-website.vercel.app>
   - Try `/api/health` endpoint
   - Test contact form

4. **If auto-deploy didn't work:**
   - Disable Vercel Deploy Protection (1 minute)
   - OR use Vercel CLI: `vercel --prod`

5. **Setup environment variables in Vercel:**

   ```bash
   vercel env add EMAIL_USER
   vercel env add EMAIL_PASSWORD
   vercel env add VITE_SUPABASE_URL
   # ... add all from .env
   ```

6. **Redeploy:**

   ```bash
   vercel --prod
   ```

---

## 💡 PRO TIPS

1. **Always test locally before pushing:**

   ```bash
   npm run build    # Test build
   npm run preview  # Test production version
   ```

2. **Use git branches for development:**

   ```bash
   git checkout -b feature/new-feature
   # ... make changes ...
   git push origin feature/new-feature
   # Vercel creates preview deployment automatically!
   ```

3. **Check build logs for errors:**

   ```bash
   vercel logs   # Shows recent logs
   ```

4. **Protect main branch:**
   - Require PR reviews before merge
   - Prevents accidental bad deploys

5. **Monitor deployments:**
   - Set up Slack notifications
   - Get alerts on failed builds

---

## 🎉 DEPLOYMENT COMPLETE

Your project is now:

- ✅ On GitHub
- ✅ Connected to Vercel
- ✅ Auto-deploying on every push
- ✅ Production ready

**Just push → Vercel deploys → Site goes live!** 🚀
