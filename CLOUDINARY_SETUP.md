# Cloudinary Setup Guide

Cloudinary is required for image uploads in your A/B testing application. Follow these steps to set it up:

## Step 1: Create a Cloudinary Account

1. Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Sign up for a free account (no credit card required)
3. Verify your email address

## Step 2: Get Your Cloudinary Credentials

1. After logging in, you'll be taken to your Dashboard
2. On the Dashboard, you'll see your **Account Details** which include:
   - **Cloud Name** (e.g., `demo`)
   - **API Key** (a long string)
   - **API Secret** (click "Reveal" to see it)

## Step 3: Add Credentials to Backend `.env`

Open `/Users/athinageronatsiou/Desktop/AB Testing/backend/.env` and add or update these lines:

```env
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

**Important:** 
- Replace `your-cloud-name`, `your-api-key`, and `your-api-secret` with your actual values from Cloudinary
- Don't include quotes around the values (or if you do, make sure they're consistent)
- Make sure there are no extra spaces

## Step 4: Restart Backend Server

After adding the credentials, restart your backend server:

1. Stop the backend server (Ctrl+C in the backend terminal)
2. Start it again: `cd backend && npm run dev`

## Step 5: Test Image Upload

Try uploading an image again. It should work now!

## Troubleshooting

- **"Cloudinary not configured"** → Make sure all three variables are set in `backend/.env`
- **"Invalid API key"** → Double-check your API key and secret from Cloudinary dashboard
- **Still not working** → Make sure you restarted the backend server after adding the credentials

## Free Tier Limits

Cloudinary's free tier includes:
- 25 GB storage
- 25 GB bandwidth per month
- Unlimited transformations
- Perfect for development and small projects!

