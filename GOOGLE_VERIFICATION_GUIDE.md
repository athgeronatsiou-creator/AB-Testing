# Google OAuth Verification Guide

## Quick Setup for Development (No Verification Needed)

For local development, you can use **Testing mode** which doesn't require verification:

### Step 1: Configure OAuth Consent Screen

1. Go to: https://console.cloud.google.com/apis/credentials/consent
2. Click **"CONFIGURE CONSENT SCREEN"** (or edit if already configured)
3. Choose **"External"** (unless you have Google Workspace)
4. Click **"CREATE"**

### Step 2: Fill in Required Information

**App Information:**
- **App name**: `A/B Testing App` (or any name)
- **User support email**: Your email address
- **Developer contact information**: Your email address
- Click **"SAVE AND CONTINUE"**

**Scopes:**
- Click **"ADD OR REMOVE SCOPES"**
- Make sure these are selected:
  - `.../auth/userinfo.email`
  - `.../auth/userinfo.profile`
  - `openid`
- Click **"UPDATE"** then **"SAVE AND CONTINUE"**

**Test Users:**
- Click **"ADD USERS"**
- Add your Gmail address (the one you'll use to sign in)
- Click **"ADD"**
- Click **"SAVE AND CONTINUE"**

**Summary:**
- Review everything
- Click **"BACK TO DASHBOARD"**

### Step 3: Set App to Testing Mode

1. On the OAuth consent screen page, you should see **"Publishing status"**
2. Make sure it says **"Testing"** (not "In production")
3. If it says "In production", click **"PUBLISH APP"** → **"CONFIRM"** (this makes it testing mode)

### Step 4: Test Sign-In

Now you should be able to sign in with the Gmail account you added as a test user!

---

## If You Need Production Verification

If you want to make the app available to everyone (not just test users), you'll need to:

1. **Complete OAuth consent screen** with all required information
2. **Submit for verification** (if requesting sensitive scopes)
3. **Wait for Google's review** (can take days/weeks)

For development, **Testing mode is sufficient** and doesn't require verification.

---

## Troubleshooting

**"This app isn't verified" error:**
- Make sure you added your email as a test user
- Make sure the app is in "Testing" mode
- Try signing in with the exact email you added

**"Access blocked" error:**
- Go to OAuth consent screen
- Add your email to "Test users" list
- Wait a few minutes and try again

**Can't find OAuth consent screen:**
- Go to: https://console.cloud.google.com/apis/credentials/consent
- Or: APIs & Services → OAuth consent screen


