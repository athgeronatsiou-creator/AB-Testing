# Google OAuth Setup Guide

## Step 1: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Enable Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
   - Or use "Google Identity" API (newer)
4. Create OAuth 2.0 Credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - If prompted, configure OAuth consent screen first:
     - Choose "External" (unless you have Google Workspace)
     - Fill in app name, support email
     - Add your email to test users
   - Application type: "Web application"
   - Name: "A/B Testing App" (or any name)
   - Authorized redirect URIs: 
     ```
     http://localhost:3000/api/auth/callback/google
     ```
   - Click "Create"
5. Copy your **Client ID** and **Client Secret**

## Step 2: Configure Environment Variables

### Frontend (`frontend/.env.local`)

Create or edit `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
NEXT_PUBLIC_SOCKET_URL="http://localhost:4000"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-here-make-it-long-and-random"
GOOGLE_CLIENT_ID="your-client-id-from-google"
GOOGLE_CLIENT_SECRET="your-client-secret-from-google"
```

**Important:** Generate a random secret for `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### Backend (`backend/.env`)

Make sure `backend/.env` has the **same** `JWT_SECRET` as `NEXTAUTH_SECRET`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ab_testing"
JWT_SECRET="same-secret-as-NEXTAUTH_SECRET"
PORT=4000
CLIENT_ORIGIN="http://localhost:3000"
```

## Step 3: Restart Servers

After setting up environment variables:

1. Stop the frontend server (Ctrl+C)
2. Restart it: `cd frontend && npm run dev`
3. Make sure backend is running: `cd backend && npm run dev`

## Step 4: Test Sign-In

1. Go to http://localhost:3000
2. Click "Sign in with Google" button
3. You should be redirected to Google sign-in
4. After signing in, you'll be redirected back to the app

## Troubleshooting

- **"Invalid client" error**: Check that GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are correct
- **Redirect URI mismatch**: Make sure the redirect URI in Google Console exactly matches: `http://localhost:3000/api/auth/callback/google`
- **"Unauthorized" errors**: Make sure JWT_SECRET in backend matches NEXTAUTH_SECRET in frontend
- **Server not responding**: Make sure both frontend and backend servers are running


