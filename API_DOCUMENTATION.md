# SPD Online Marketplace - Backend API Documentation

**Base URL**: https://spd-lab-backend-db797613f87b.herokuapp.com

## 📚 API Endpoints Overview

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product detail
- `POST /api/products` - Create product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

### Orders
- `POST /api/orders` - Create order/checkout (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order detail (protected)
- `PUT /api/orders/:id/status` - Update order status (protected)


## Base URL
```
http://localhost:3000
https://spd-lab-backend-db797613f87b.herokuapp.com
```

## Authentication
Semua endpoint yang dilindungi memerlukan JWT token dalam header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### 1. Register User
- **Endpoint**: `POST /api/auth/register`
- **Description**: Membuat akun user baru
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response** (201):
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 2. Login
- **Endpoint**: `POST /api/auth/login`
- **Description**: Login ke akun user
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Response** (200):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 3. Get Current User
- **Endpoint**: `GET /api/auth/me`
- **Protected**: Yes (requires token)
- **Response** (200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2024-02-07T10:00:00.000Z",
  "updatedAt": "2024-02-07T10:00:00.000Z"
}
```

---

## Product Endpoints

### 1. Get All Products
- **Endpoint**: `GET /api/products`
- **Description**: Mengambil semua produk dengan sorting terbaru
- **Query Parameters**: (optional)
  - `limit`: jumlah produk per halaman
  - `skip`: jumlah produk yang di-skip
- **Response** (200):
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Laptop Gaming",
    "price": 15000000,
    "quantity": 5,
    "description": "High performance gaming laptop",
    "imgUrl": "https://example.com/laptop.jpg",
    "createdAt": "2024-02-07T10:00:00.000Z",
    "updatedAt": "2024-02-07T10:00:00.000Z"
  }
]
```

### 2. Get Product by ID
- **Endpoint**: `GET /api/products/:id`
- **Description**: Mengambil detail produk spesifik
- **Response** (200):
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Laptop Gaming",
  "price": 15000000,
  "quantity": 5,
  "description": "High performance gaming laptop",
  "imgUrl": "https://example.com/laptop.jpg",
  "createdAt": "2024-02-07T10:00:00.000Z",
  "updatedAt": "2024-02-07T10:00:00.000Z"
}
```

### 3. Create Product
- **Endpoint**: `POST /api/products`
- **Protected**: Yes (requires token)
- **Description**: Membuat produk baru
- **Body**:
```json
{
  "name": "Smartphone Android",
  "price": 5000000,
  "quantity": 20,
  "description": "Latest Android smartphone with 5G support",
  "imgUrl": "https://example.com/phone.jpg"
}
```
- **Response** (201):
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Smartphone Android",
  "price": 5000000,
  "quantity": 20,
  "description": "Latest Android smartphone with 5G support",
  "imgUrl": "https://example.com/phone.jpg",
  "createdAt": "2024-02-07T10:00:00.000Z",
  "updatedAt": "2024-02-07T10:00:00.000Z"
}
```

### 4. Update Product
- **Endpoint**: `PUT /api/products/:id`
- **Protected**: Yes (requires token)
- **Description**: Update informasi produk
- **Body**: (same as create, all fields required)
- **Response** (200): Updated product object

### 5. Delete Product
- **Endpoint**: `DELETE /api/products/:id`
- **Protected**: Yes (requires token)
- **Description**: Menghapus produk
- **Response** (200):
```json
{
  "message": "Product deleted successfully"
}
```

---

## Order Endpoints (Checkout)

### 1. Create Order (Checkout)
- **Endpoint**: `POST /api/orders`
- **Protected**: Yes (requires token)
- **Description**: Membuat order baru (checkout)
- **Body**:
```json
{
  "items": [
    {
      "productId": "507f1f77bcf86cd799439011",
      "quantity": 2
    },
    {
      "productId": "507f1f77bcf86cd799439012",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "street": "Jl. Merdeka No. 123",
    "city": "Jakarta",
    "postalCode": "12345",
    "country": "Indonesia"
  },
  "paymentMethod": "credit_card"
}
```
- **Payment Methods**: `credit_card`, `bank_transfer`, `e_wallet`
- **Response** (201):
```json
{
  "message": "Order created successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439013",
    "user": "507f1f77bcf86cd799439011",
    "items": [
      {
        "product": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "Laptop Gaming",
          "price": 15000000
        },
        "quantity": 2,
        "price": 15000000
      }
    ],
    "totalPrice": 30000000,
    "status": "pending",
    "shippingAddress": {
      "street": "Jl. Merdeka No. 123",
      "city": "Jakarta",
      "postalCode": "12345",
      "country": "Indonesia"
    },
    "paymentMethod": "credit_card",
    "createdAt": "2024-02-07T10:00:00.000Z",
    "updatedAt": "2024-02-07T10:00:00.000Z"
  }
}
```

### 2. Get All User Orders
- **Endpoint**: `GET /api/orders`
- **Protected**: Yes (requires token)
- **Description**: Mengambil semua order dari user yang login
- **Response** (200): Array of order objects

### 3. Get Single Order
- **Endpoint**: `GET /api/orders/:id`
- **Protected**: Yes (requires token)
- **Description**: Mengambil detail order spesifik
- **Response** (200): Order object dengan detail lengkap

### 4. Update Order Status
- **Endpoint**: `PUT /api/orders/:id/status`
- **Protected**: Yes (requires token)
- **Description**: Update status order
- **Body**:
```json
{
  "status": "completed"
}
```
- **Status Options**: `pending`, `completed`, `cancelled`
- **Response** (200): Updated order object

---

## Error Responses

### 400 - Bad Request
```json
{
  "error": "Name, price, description, and imgUrl are required"
}
```

### 401 - Unauthorized
```json
{
  "error": "No token provided"
}
```

### 403 - Forbidden
```json
{
  "error": "Invalid or expired token"
}
```

### 404 - Not Found
```json
{
  "error": "Product not found"
}
```

### 409 - Conflict
```json
{
  "error": "Email already registered"
}
```

### 500 - Internal Server Error
```json
{
  "error": "Internal Server Error"
}
```

---

## Testing dengan Postman

1. **Register**: POST ke `/api/auth/register` dengan nama, email, password
2. **Login**: POST ke `/api/auth/login` dengan email, password (dapatkan token)
3. **Copy token** ke Postman header
4. **Set Authorization**: Type = Bearer Token, paste token
5. **Test semua endpoint** dengan token tersebut

---

## Database Schema

### User
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Product
```javascript
{
  _id: ObjectId,
  name: String,
  price: Number,
  quantity: Number,
  description: String,
  imgUrl: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Order
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  status: String (pending, completed, cancelled),
  shippingAddress: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String (credit_card, bank_transfer, e_wallet),
  createdAt: Date,
  updatedAt: Date
}
```