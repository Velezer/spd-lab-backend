# SPD Online Marketplace - Backend API
**Technology Stack**: Node.js, Express.js, MongoDB, JWT Authentication, Heroku
**Base URL**: https://spd-lab-backend-db797613f87b.herokuapp.com

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v14 atau lebih tinggi)
- npm atau yarn
- MongoDB Atlas account (untuk cloud) atau MongoDB lokal
- VS Code atau text editor lainnya

### 1. Clone Repository
```bash
git clone <repository-url>
cd spd-lab-backend
```

### 2. Install Dependencies
```bash
npm install
```

Packages yang diinstal:
- `express`: Web framework
- `mongoose`: MongoDB ODM
- `jsonwebtoken`: JWT token generation
- `bcryptjs`: Password hashing
- `cors`: Cross-Origin Resource Sharing
- `dotenv`: Environment variables

### 3. Setup Environment Variables

Buat file `.env` dari `.env.example`:
```bash
cp .env.example .env
```

Edit `.env` dengan konfigurasi Anda:
```env
# MongoDB Connection String
# Untuk cloud: MongoDB Atlas
# Format: mongodb+srv://username:password@cluster.mongodb.net/dbname
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/spd-marketplace?retryWrites=true&w=majority

# JWT Secret (gunakan string yang kompleks dan random)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d

# Server Port
PORT=3000

# CORS Origins (untuk development dan production)
CLIENT_ORIGIN=http://localhost:3000,http://localhost:3001,http://localhost:5173,http://localhost:19000,*
```

### 4.0 Seeder Product (Optional)
```bash
npm run seed
```

### 4.1 Run Server

**Development Mode**:
```bash
npm start
```

**Output Expected**:
```
MongoDB connected
Server running on port 3000
CORS allowed origins: [ ... ]
```

Server akan berjalan di: `http://localhost:3000`
---

## 🔗 API Endpoints
Untuk detail lengkap, lihat [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 🔐 Authentication Flow

### Register → Token Acquisition → API Access

```
1. User Register
   POST /api/auth/register
   → Create user dengan password hashing
   → Generate JWT token
   → Return token + user data

2. User Login
   POST /api/auth/login
   → Verify email & password
   → Generate JWT token
   → Return token

3. API Request dengan Token
   Authorization: Bearer <token>
   → Middleware verify token
   → Extract user id dari token
   → Proceed dengan request

4. Token Expiration
   - Default: 7 days
   - Dapat di-customize di env variable
```

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
**Error**: `MongoDB connection failed`
- Check MONGO_URI di `.env`
- Pastikan IP whitelist di MongoDB Atlas
- Verifikasi credentials

### JWT Token Invalid
**Error**: `Invalid or expired token`
- Token mungkin expired (7 hari)
- Logout dan login ulang untuk token baru
- Check JWT_SECRET sama di `.env` dan production

### CORS Error
**Error**: `Access to XMLHttpRequest has been blocked by CORS policy`
- Add frontend URL ke CLIENT_ORIGIN di `.env`
- Format: `http://localhost:3000,http://localhost:5173`

### Port Already in Use
**Error**: `listen EADDRINUSE :::3000`
- Kill process: `lsof -ti:3000 | xargs kill -9` (Mac/Linux)
- Atau gunakan port lain: `PORT=3001 npm start`

---
