# Fix Google OAuth Redirect URI Mismatch

## Issue
You're getting `Error 400: redirect_uri_mismatch` because the redirect URI in Google Cloud Console doesn't match what NextAuth is sending.

## Solution

### Step 1: Update Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** > **Credentials**
3. Find your OAuth 2.0 Client ID (the one ending in `.apps.googleusercontent.com`)
4. Click **Edit** (pencil icon)
5. Under **Authorized redirect URIs**, add or update:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
6. Click **Save**

### Step 2: Restart Your Frontend Server

After updating the redirect URI:

```bash
cd frontend
# Stop the server (Ctrl+C if running)
npm run dev
```

### Step 3: Test

1. Go to `http://localhost:3000`
2. Click "Sign in with Google"
3. You should now be redirected to Google sign-in without errors

## Important Notes

- The redirect URI must **exactly** match: `http://localhost:3000/api/auth/callback/google`
- Make sure there are no trailing slashes or typos
- If you're using a different port, update both the `.env.local` file and Google Console
- Changes in Google Console can take a few minutes to propagate

## Current Configuration

Your `.env.local` has been updated to:
- `NEXTAUTH_URL="http://localhost:3000"`
- `NEXT_PUBLIC_API_URL="http://localhost:4000/api"`
- `NEXT_PUBLIC_SOCKET_URL="http://localhost:4000"`

Make sure your Google OAuth credentials have the redirect URI: `http://localhost:3000/api/auth/callback/google`

