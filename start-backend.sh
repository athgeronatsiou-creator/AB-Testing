#!/bin/bash
cd "/Users/athinageronatsiou/Desktop/AB Testing/backend"
echo "🛑 Stopping existing backend..."
pkill -f "nodemon.*backend" 2>/dev/null
sleep 2
echo "🚀 Starting backend server..."
npm run dev

