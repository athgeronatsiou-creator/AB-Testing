# Deployment Guide

## Prerequisites
- PostgreSQL database (local Docker: `docker-compose up -d db`)
- Backend env vars: `DATABASE_URL`, `JWT_SECRET` (match `NEXTAUTH_SECRET`), `PORT`, `CLIENT_ORIGIN`, `CLOUDINARY_*`
- Frontend env vars: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SOCKET_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`

## Backend
```bash
cd backend
DATABASE_URL=postgresql://... npm run prisma:migrate
npm run build
NODE_ENV=production PORT=4000 node dist/index.js
```

## Frontend
```bash
cd frontend
npm run build
npm start
# or deploy to Vercel with env vars above
```

## Deployment Targets
- Backend: Render/Fly/Heroku/Dokku (enable WebSocket, set env, attach Postgres)
- Frontend: Vercel/Netlify (set env; backend URL must be HTTPS and CORS allowlisted)
- Storage: Cloudinary (add allowed origins)

## Notes
- Keep `JWT_SECRET` = `NEXTAUTH_SECRET` so backend can verify frontend tokens.
- Ensure CORS origins include the frontend URL; Socket.io uses `NEXT_PUBLIC_SOCKET_URL`.
- Run `docker-compose up -d db` in `infra/` for local development database.


