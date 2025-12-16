#!/bin/bash

echo "🔐 Google OAuth Credentials Setup"
echo ""
echo "This script will help you add your Google OAuth credentials to the app."
echo ""
read -p "Have you created OAuth credentials in Google Cloud Console? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Please go to: https://console.cloud.google.com/apis/credentials"
    echo "1. Create a new project (or select existing)"
    echo "2. Go to 'APIs & Services' > 'Credentials'"
    echo "3. Click 'Create Credentials' > 'OAuth client ID'"
    echo "4. Configure OAuth consent screen if prompted"
    echo "5. Choose 'Web application'"
    echo "6. Add redirect URI: http://localhost:3000/api/auth/callback/google"
    echo "7. Copy your Client ID and Client Secret"
    echo ""
    exit 1
fi

echo ""
echo "Please enter your Google OAuth credentials:"
echo ""
read -p "Google Client ID: " CLIENT_ID
read -p "Google Client Secret: " CLIENT_SECRET

if [ -z "$CLIENT_ID" ] || [ -z "$CLIENT_SECRET" ]; then
    echo "❌ Error: Both Client ID and Client Secret are required!"
    exit 1
fi

# Update frontend/.env.local
ENV_FILE="frontend/.env.local"

if [ ! -f "$ENV_FILE" ]; then
    echo "❌ Error: $ENV_FILE not found!"
    exit 1
fi

# Use sed to replace the values (works on macOS)
sed -i '' "s|GOOGLE_CLIENT_ID=\"\"|GOOGLE_CLIENT_ID=\"$CLIENT_ID\"|g" "$ENV_FILE"
sed -i '' "s|GOOGLE_CLIENT_SECRET=\"\"|GOOGLE_CLIENT_SECRET=\"$CLIENT_SECRET\"|g" "$ENV_FILE"

echo ""
echo "✅ Successfully updated $ENV_FILE"
echo ""
echo "📝 Next steps:"
echo "1. Restart your frontend server (stop with Ctrl+C, then run: cd frontend && npm run dev)"
echo "2. Go to http://localhost:3000"
echo "3. Click 'Sign in with Google'"
echo ""


