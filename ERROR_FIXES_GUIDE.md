# 🔧 Error Fixes & Setup Guide

## Critical Issues Fixed ✅

### 1. **Secrets Exposed in .env** ✅ FIXED

**What was wrong:**

- GitHub token, Vercel token, and Supabase keys were in plaintext `.env` file
- If repo goes public, all infrastructure is compromised

**What we did:**

- Created `.env.example` with dummy values
- Updated `.gitignore` to prevent `.env` from being committed
- Created proper `.env.example` template

**Next steps:**

```bash
# 1. Copy .env.example to your local machine
cp .env.example .env

# 2. Fill in your actual secrets in .env (local only, never commit)

# 3. For production, use Vercel Environment Variables:
#    - Go to Vercel Dashboard → Project Settings → Environment Variables
#    - Add each secret from .env there
#    - DO NOT add .env file to production
```

---

### 2. **Backend API Was Missing** ✅ FIXED

**What was wrong:**

- Contact forms, bookings, and subscriptions had nowhere to go
- Users couldn't submit data from websites

**What we did:**

- Created `/api/contact.js` - Handle contact form submissions
- Created `/api/booking.js` - Handle appointment/booking requests
- Created `/api/subscribe.js` - Handle newsletter signups
- Created `/api/health.js` - Health check endpoint
- Updated `/backend/index.js` - Express.js server with all endpoints
- Updated `/backend/package.json` - Added required dependencies

**How to use:**

```bash
# Local development
cd backend
npm install
npm run dev  # Runs on http://localhost:3001

# Test endpoints
curl -X GET http://localhost:3001/api/health

curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John",
    "email": "john@example.com",
    "phone": "1234567890",
    "message": "Hello!",
    "website_name": "My Gym"
  }'
```

**Production (Vercel):**

- Vercel automatically deploys `/api/*` routes as serverless functions
- No need to run backend server separately

---

### 3. **Vercel Deploy Protection Blocking Automation** ⚠️ NEEDS MANUAL FIX

**What's wrong:**

- Website Builder dashboard can't auto-deploy
- Manual GitHub push works, but Vercel doesn't auto-deploy

**How to fix (IMPORTANT!):**

1. Go to: <https://vercel.com/dashboard>
2. Select your **Website Builder project**
3. Click **Settings** → **General**
4. Scroll down to **"Deploy Protection"**
5. **Toggle OFF** the "Deploy Protection" setting
6. Save changes

**Why:** Deploy Protection requires manual approval for each deploy. Without disabling it, GitHub webhooks won't auto-deploy.

---

## Environment Variables Setup

### For Local Development

```bash
# Create .env file from .env.example
cp .env.example .env

# Fill in these values:
GITHUB_TOKEN=ghp_xxxxxxxxxxxx          # From GitHub Settings
VITE_SUPABASE_URL=https://your-project.supabase.co   # From Supabase
VITE_SUPABASE_ANON_KEY=sb_xxxxx       # From Supabase
VERCEL_TOKEN=vcp_xxxxxx               # From Vercel Settings
TELEGRAM_BOT_TOKEN=123456:ABCdef      # From Telegram Bot Father
EMAIL_USER=your-email@gmail.com       # Gmail for sending emails
EMAIL_PASSWORD=app-specific-password  # Gmail app password (NOT your regular password)
```

### For Vercel Deployment

1. Go to Project → Settings → Environment Variables
2. Add all secrets there (Vercel stores them encrypted)
3. These will be injected automatically at build/runtime

---

## Email Configuration (Gmail)

### Setup Gmail for Sending Emails

1. Go to: <https://myaccount.google.com/apppasswords>
2. Select **Mail** and **Windows Computer** (or your device)
3. Google will generate a 16-character password
4. Copy that password and set `EMAIL_PASSWORD=` to it in `.env`

### Test Email Sending

```javascript
// In your React component or test file
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    message: 'Testing email system',
    website_name: 'Test Site'
  })
});

const result = await response.json();
console.log(result);
```

---

## API Endpoints Ready to Use

### Contact Form

```
POST /api/contact

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",      // optional
  "message": "Hello!",
  "website_name": "My Gym"     // optional
}

Response:
{
  "success": true,
  "message": "Your message has been sent successfully"
}
```

### Booking/Appointment

```
POST /api/booking

Body:
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "9876543210",
  "date": "2026-04-20",
  "time": "10:00 AM",          // optional
  "service": "Personal Training",
  "website_name": "Iron Gym",  // optional
  "notes": "Any special requirements"  // optional
}

Response:
{
  "success": true,
  "message": "Your booking has been submitted successfully",
  "bookingId": "BOOK_1234567890"
}
```

### Newsletter Subscribe

```
POST /api/subscribe

Body:
{
  "email": "subscriber@example.com"
}

Response:
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "email": "subscriber@example.com"
}
```

### Health Check

```
GET /api/health

Response:
{
  "status": "ok",
  "message": "Backend API is running",
  "timestamp": "2026-04-10T12:34:56.789Z",
  "environment": "production"
}
```

---

## How to Use in React Components

### Example: Contact Form Component

```jsx
import { useState } from 'react';

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          phone: e.target.phone.value,
          message: e.target.message.value,
          website_name: 'My Website'
        })
      });

      const result = await response.json();
      if (result.success) {
        setMessage('✅ Message sent successfully!');
        e.target.reset();
      } else {
        setMessage('❌ Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Your Name" required />
      <input name="email" type="email" placeholder="Your Email" required />
      <input name="phone" placeholder="Phone (optional)" />
      <textarea name="message" placeholder="Your Message" required></textarea>
      <button type="submit" disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
```

---

## Security Best Practices

✅ **Do:**

- Store secrets in `.env` locally (never commit)
- Use `.env.example` to show required variables
- Store production secrets in Vercel, GitHub, or a secret manager
- Validate all user input on both frontend and backend
- Use HTTPS only (Vercel provides this by default)
- Set `NODE_ENV=production` in Vercel environment

❌ **Don't:**

- Commit `.env` file to GitHub
- Put secrets in code or comments
- Use the same secrets across dev/staging/production
- Trust client-side validation alone
- Use old/leaked tokens
- Share secrets in Slack or emails

---

## Troubleshooting

### API endpoints returning 404

**Cause:** Vercel Deploy Protection is still on
**Fix:** Follow step 3 above to disable it

### Emails not sending

**Cause:** Wrong Gmail app password or email not configured
**Fix:**

1. Make sure `EMAIL_USER` and `EMAIL_PASSWORD` are set in Vercel env vars
2. Generate a new Gmail app password
3. Check Vercel function logs for errors

### CORS errors

**Cause:** Frontend and backend on different domains
**Fix:** Vercel `.json` already handles CORS, but if issues persist:

```javascript
// Add to your fetch calls
headers: {
  'Content-Type': 'application/json',
}
```

### Secret shows as undefined in production

**Cause:** Environment variable not added to Vercel
**Fix:**

1. Go to Vercel → Project Settings → Environment Variables
2. Add the missing variable
3. Redeploy the project

---

## Next Steps

1. ✅ **Install backend dependencies**

   ```bash
   cd backend && npm install
   ```

2. ✅ **Set up your .env file locally**

   ```bash
   cp .env.example .env
   # Edit .env with your actual secrets
   ```

3. ✅ **Test API locally**

   ```bash
   cd backend && npm run dev
   # Visit http://localhost:3001/api/health
   ```

4. ✅ **Disable Vercel Deploy Protection** (See step 3 above)

5. ✅ **Update Vercel Environment Variables**
   - Go to Vercel dashboard
   - Add all secrets from your .env file

6. ✅ **Test endpoints in production**
   - Use Vercel logs to debug
   - Check if emails are being sent

7. ✅ **Update website components to use API**
   - Replace form submissions to call `/api/contact`
   - Replace booking forms to call `/api/booking`
   - Add newsletter signup to call `/api/subscribe`

---

## Still having issues?

Check these files for configuration:

- `/api/contact.js` - Contact form endpoint
- `/api/booking.js` - Booking endpoint
- `/api/subscribe.js` - Newsletter endpoint
- `/backend/index.js` - Local Express server
- `vercel.json` - Vercel deployment config
- `.env.example` - Environment variable template
