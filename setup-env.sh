#!/bin/bash

# Setup script for A/B Testing App environment variables

SECRET="KBT7PdGgh556WcdASig1YKE4Rp8EnM8/xnZsqWFSWsM="

echo "🔧 Setting up environment variables..."
echo ""

# Frontend .env.local.local
if [ ! -f "frontend/.env.local" ]; then
  cat > frontend/.env.local.local << EOF
# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
NEXT_PUBLIC_SOCKET_URL="http://localhost:4000"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="${SECRET}"

# Google OAuth (get from https://console.cloud.google.com/apis/credentials)
# Add these after creating OAuth credentials:
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
EOF
  echo "✅ Created frontend/.env.local"
else
  echo "⚠️  frontend/.env.local already exists - not overwriting"
fi

# Backend .env.local
if [ ! -f "backend/.env" ]; then
  cat > backend/.env.local << EOF
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ab_testing"

# JWT Secret (must match NEXTAUTH_SECRET in frontend)
JWT_SECRET="${SECRET}"

# Server
PORT=4000
NODE_ENV=development
CLIENT_ORIGIN="http://localhost:3000"

# Cloudinary (optional - only needed for image uploads)
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
EOF
  echo "✅ Created backend/.env"
else
  echo "⚠️  backend/.env already exists - checking JWT_SECRET..."
  if ! grep -q "JWT_SECRET" backend/.env.local; then
    echo "JWT_SECRET=\"${SECRET}\"" >> backend/.env.local
    echo "✅ Added JWT_SECRET to backend/.env"
  else
    echo "⚠️  JWT_SECRET already exists in backend/.env"
    echo "   Make sure it matches NEXTAUTH_SECRET in frontend/.env.local"
  fi
fi

echo ""
echo "📝 Next steps:"
echo "1. Get Google OAuth credentials from: https://console.cloud.google.com/apis/credentials"
echo "2. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to frontend/.env.local"
echo "3. Make sure redirect URI is: http://localhost:3000/api/auth/callback/google"
echo "4. Restart your frontend server: cd frontend && npm run dev"
echo ""
echo "📖 See GOOGLE_OAUTH_SETUP.md for detailed instructions"


