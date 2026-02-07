# 🚀 Quick Start Guide - Backend API

Panduan cepat untuk setup dan menjalankan backend SPD Online Marketplace.

### 1. Clone & Install
```bash
# Navigate to project folder
cd spd-lab-backend

# Install dependencies
npm install
```

### 2. Setup Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env file dengan text editor
# (Minimum: set MONGO_URI dengan MongoDB Atlas)
```

### 3. Get MongoDB Connection
1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up (free)
3. Create cluster
4. Get connection string
5. Copy to MONGO_URI in .env

**Example MongoDB Atlas Connection**:
```
MONGO_URI=mongodb+srv://username:password@cluster0.abcde.mongodb.net/spd-marketplace?retryWrites=true&w=majority
```

### 4. Run Server
```bash
# Start server
npm start

# Expected output:
# MongoDB connected
# Server running on port 3000
```

✅ **Backend is running!**

---

## 🌱 Seed Sample Data

```bash
# Insert 10 sample products to database
npm run seed

# Output:
# ✅ Successfully seeded 10 products!
# 1. Laptop Gaming ROG - Rp 15,000,000
# 2. iPhone 15 Pro Max - Rp 18,000,000
# ... etc
```

---

## 🔑 Key Environment Variables

```env
# Database Connection (MongoDB Atlas)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/spd-marketplace

# JWT Secret (change this in production!)
JWT_SECRET=your_super_secret_key_here

# Server Port
PORT=3000

# CORS - Allowed frontend origins
CLIENT_ORIGIN=http://localhost:3000,http://localhost:5173,http://localhost:19000
```

---
**API documentation**: See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: MongoDB connection failed
```
**Solution**:
- Check MONGO_URI in .env is correct
- Add your IP to MongoDB Atlas whitelist (Security → Network Access)
- Verify username:password doesn't have special characters

### Port Already in Use
```
Error: listen EADDRINUSE :::3000
```
**Solution**:
```bash
# Use different port
PORT=3001 npm start

# Or kill process on port 3000
lsof -ti:3000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :3000   # Windows (find PID)
taskkill /PID <PID> /F         # Windows (kill it)
```

### JWT Token Error
```
Error: Invalid or expired token
```
**Solution**:
- Login again to get new token
- Check JWT_SECRET is same in .env and code
- Token expires after 7 days

### CORS Error in Frontend
```
Error: Access to XMLHttpRequest blocked by CORS
```
**Solution**:
- Add frontend URL to CLIENT_ORIGIN in .env
- Format: `http://localhost:3000,http://localhost:5173`
- Restart server after changing .env
