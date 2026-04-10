# ✅ DEPLOYMENT CHECKLIST - Follow These Steps

**Date Created:** April 10, 2026  
**Status:** Critical Errors Fixed - Ready to Test

---

## 🚨 IMMEDIATE ACTIONS (Do These First!)

### Step 1: Disable Vercel Deploy Protection [⏱️ 1 minute]

- [ ] Go to <https://vercel.com/dashboard>
- [ ] Click on **Website Builder** project
- [ ] Go to **Settings** → **General**
- [ ] Find **"Deploy Protection"** section
- [ ] Click **Toggle OFF**
- [ ] Save changes
- [ ] ✅ Done! Auto-deploys will now work

### Step 2: Setup Local Environment [⏱️ 5 minutes]

```bash
# In project root folder
cp .env.example .env

# Edit .env file and fill in:
# - GITHUB_TOKEN (from GitHub Settings)
# - VERCEL_TOKEN (from Vercel Settings)
# - SUPABASE_URL & SUPABASE_ANON_KEY (from Supabase)
# - EMAIL_USER (your Gmail)
# - EMAIL_PASSWORD (Gmail app password - NOT regular password)
```

### Step 3: Generate Gmail App Password [⏱️ 2 minutes]

- [ ] Go to <https://myaccount.google.com/apppasswords>
- [ ] Select "Mail" and "Windows Computer"
- [ ] Google will give you 16-character password
- [ ] Copy it and paste into `.env` as `EMAIL_PASSWORD=`
- [ ] Save .env file

---

## 📦 BACKEND SETUP [⏱️ 10 minutes]

### Step 4: Install Backend Dependencies

```bash
cd backend
npm install
```

- [ ] Dependencies installed successfully ✅

### Step 5: Test Backend Locally

```bash
npm run dev
```

You should see:

```
🚀 Backend API running on port 3001
📝 Health check: 3001/api/health
```

- [ ] Backend running on <http://localhost:3001> ✅
- [ ] Can access <http://localhost:3001/api/health> ✅

### Step 6: Test API Endpoints Locally

```bash
# In a new terminal, test the endpoints:

# Test health check
curl http://localhost:3001/api/health

# Test contact form
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'

# Test booking
curl -X POST http://localhost:3001/api/booking \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","phone":"123","date":"2026-04-20","service":"Test"}'

# Test subscribe
curl -X POST http://localhost:3001/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

- [ ] All endpoints responding with 200 ✅
- [ ] Emails being received ✅

---

## 🌐 VERCEL PRODUCTION SETUP [⏱️ 15 minutes]

### Step 7: Add Secrets to Vercel

1. [ ] Go to <https://vercel.com/dashboard>
2. [ ] Click on your **Website Builder** project
3. [ ] Go to **Settings** → **Environment Variables**
4. [ ] Add each value from your `.env` file:
   - `GITHUB_TOKEN`
   - `VERCEL_TOKEN`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `EMAIL_USER`
   - `EMAIL_PASSWORD`
   - `NODE_ENV=production`
5. [ ] Click **Save** ✅

### Step 8: Deploy to Vercel

Option A: Manual Push

```bash
git add .
git commit -m "fix: critical security & backend issues"
git push origin main
```

Option B: Use Vercel CLI

```bash
npm install -g vercel
vercel --prod
```

- [ ] Deployment successful ✅
- [ ] Check Vercel logs for any errors

### Step 9: Test Production Endpoints

```bash
# Replace YOUR_VERCEL_URL with your actual Vercel domain
curl https://YOUR_VERCEL_URL/api/health

# Should return:
# {"status":"ok","message":"Backend API is running",...}
```

- [ ] Health check endpoint working ✅
- [ ] API endpoints accessible ✅

---

## 🔗 UPDATE WEBSITE COMPONENTS [⏱️ 30 minutes]

### Step 10: Update Contact Forms

In your React components, change:

```jsx
// OLD - Remove this
const handleSubmit = (e) => {
  // manual form handling
};

// NEW - Use this
const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
      website_name: 'My Website'
    })
  });
  const result = await response.json();
  if (result.success) {
    alert('Message sent! Check your email.');
    e.target.reset();
  } else {
    alert('Error: ' + result.message);
  }
};
```

**Files to update:**

- [ ] `/src/pages/Contact.jsx` or similar
- [ ] `/src/components/ContactForm.jsx` or similar
- [ ] Any other contact/booking forms

### Step 11: Update Booking Forms

Similar to contact forms, but use `/api/booking`:

```jsx
const handleBooking = async (e) => {
  e.preventDefault();
  const response = await fetch('/api/booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      date: e.target.date.value,
      time: e.target.time.value || '',
      service: e.target.service.value,
      website_name: 'My Business'
    })
  });
  const result = await response.json();
  if (result.success) {
    alert('Booking confirmed! Check your email.');
  }
};
```

**Files to update:**

- [ ] Any booking/appointment forms
- [ ] Gym class registration forms
- [ ] Salon appointment forms

### Step 12: Update Newsletter Signup

```jsx
const handleSubscribe = async (e) => {
  e.preventDefault();
  const response = await fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: e.target.email.value
    })
  });
  const result = await response.json();
  if (result.success) {
    alert('Welcome! Check your email for confirmation.');
    e.target.reset();
  }
};
```

**Files to update:**

- [ ] Footer newsletter signup components
- [ ] Hero section email capture forms

---

## 🧪 FINAL TESTING [⏱️ 15 minutes]

### Step 13: Test in Production

1. [ ] Visit your live website (https://YOUR_VERCEL_URL)
2. [ ] Try the contact form - email should arrive
3. [ ] Try the booking form - confirmation email should arrive
4. [ ] Try the newsletter signup - welcome email should arrive
5. [ ] Check that you receive notifications

### Step 14: Verify Emails

- [ ] Contact form email received ✅
- [ ] Booking confirmation email received ✅
- [ ] Newsletter welcome email received ✅
- [ ] Business notification emails received ✅

### Step 15: Check Vercel Logs

1. Go to Vercel Dashboard
2. Click **Deployments**
3. Look for any errors in logs
4. `curl /api/health` should return 200 OK

- [ ] No errors in Vercel logs ✅
- [ ] All functions working ✅

---

## 🎉 DEPLOYMENT COMPLETE

When all checkboxes are done:

- ✅ Secrets are secure (not exposed in code)
- ✅ Backend API is fully functional
- ✅ Email system works (contact, booking, newsletter)
- ✅ Vercel auto-deploy enabled
- ✅ All endpoints tested in production
- ✅ Website components updated to use API

---

## 📋 TROUBLESHOOTING QUICK LINKS

If something doesn't work:

1. Check `ERROR_FIXES_GUIDE.md` for detailed setup
2. Check `CRITICAL_ERRORS_FIXED.md` for what was fixed
3. Check Vercel logs: <https://vercel.com/dashboard> → logs tab
4. Test endpoints with curl to isolate issues
5. Make sure `.env` file has all required values

---

## ⏱️ Total Time: ~1.5 hours

- Vercel Deploy Protection: 1 min
- Local setup: 5 min
- Gmail password: 2 min
- Backend setup: 10 min
- Backend testing: 10 min
- Vercel setup: 15 min
- Update components: 30 min
- Final testing: 15 min
- **Total: ~1.5 hours**

Estimate: Can be live and tested by end of today! 🚀

---

Once this checklist is complete, you're ready to:

- ✅ Deploy more websites with fully working contact/booking systems
- ✅ Run deploy-20-sites.js script for bulk deployments
- ✅ Integrate Telegram bot for automations
- ✅ Scale to 100+ client websites

Good luck! You've got this! 💪
