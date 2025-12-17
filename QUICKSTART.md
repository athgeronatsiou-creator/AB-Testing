# Quick Start Guide

## Prerequisites

1. **PostgreSQL Database** - You need PostgreSQL running. Options:
   - Install Docker and run: `cd infra && docker-compose up -d db`
   - Install PostgreSQL locally and create database `ab_testing`
   - Use a cloud database (Neon, Supabase, etc.)

2. **Environment Variables** - Create `.env` files:

### Backend `.env` (in `backend/` directory):
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ab_testing"
JWT_SECRET="your-random-secret-key-here"
PORT=4000
CLIENT_ORIGIN="http://localhost:3000"
CLOUDINARY_CLOUD_NAME=""
CLOUDINARY_API_KEY=""
CLOUDINARY_API_SECRET=""
```

### Frontend `.env.local` (in `frontend/` directory):
```env
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
NEXT_PUBLIC_SOCKET_URL="http://localhost:4000"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-key-here"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Setup Steps

1. **Start Database** (if using Docker):
   ```bash
   cd infra
   docker-compose up -d db
   ```

2. **Setup Backend**:
   ```bash
   cd backend
   npm install
   # Create .env.local file with values above
   npm run prisma:migrate
   npm run dev
   ```

3. **Setup Frontend** (in a new terminal):
   ```bash
   cd frontend
   npm install
   # Create .env.local.local file with values above
   npm run dev
   ```

4. **Open Browser**: http://localhost:3000

## Common Errors

- **"Missing required env var: DATABASE_URL"** → Create `backend/.env` file
- **"Missing required env var: JWT_SECRET"** → Add JWT_SECRET to `backend/.env`
- **Database connection errors** → Make sure PostgreSQL is running
- **Port already in use** → Change PORT in `.env` or stop other services

