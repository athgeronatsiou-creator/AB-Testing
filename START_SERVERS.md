# How to Start the Servers

## Backend Server

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:4000`

## Frontend Server

In a **new terminal**:

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:3000`

## Verify Everything is Working

1. **Check Backend**: Open http://localhost:4000/api/health - should return `{"status":"ok"}`
2. **Check Frontend**: Open http://localhost:3000 - should show the welcome page
3. **Check Connection**: The frontend should be able to connect to the backend automatically

## Troubleshooting

- **"Unable to connect to the server"**: Make sure the backend is running on port 4000
- **CORS errors**: Make sure `CLIENT_ORIGIN` in `backend/.env` includes `http://localhost:3000`
- **Port already in use**: Stop other services using ports 3000 or 4000

