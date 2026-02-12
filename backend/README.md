# Supply Chain Management API - Backend

## Overview
A FastAPI-based backend system for managing supply chain operations between farmers, mandi owners, and retailers with JWT authentication.

## Tech Stack
- **Framework**: FastAPI 0.109.0
- **Database**: PostgreSQL 15
- **ORM**: SQLAlchemy 2.0.25
- **Authentication**: JWT (python-jose)
- **Password Hashing**: bcrypt (passlib)

## Database Schema
The system includes 10 tables:
1. **users** - Main user table with roles (farmer, mandi_owner, retailer, admin)
2. **farmer** - Farmer profiles
3. **crop** - Crop information
4. **mandi_owners** - Mandi owner profiles
5. **mandi_items** - Inventory items at mandi
6. **mandi_farmer_orders** - Orders between mandi and farmers
7. **retailer** - Retailer profiles
8. **retailer_item** - Retailer inventory
9. **retailer_mandi_order** - Orders between retailers and mandis
10. **alerts** - User notification system

## Setup Instructions

### 1. Install Dependencies
```bash
cd /app/backend
pip install -r requirements.txt
```

### 2. Database Setup
PostgreSQL is already configured with:
- Database: `supply_chain_db`
- User: `postgres`
- Password: `postgres`
- Port: `5432`

### 3. Environment Variables (.env)
```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/supply_chain_db
SECRET_KEY=your-secret-key-change-this-in-production-min-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### 4. Run the Server
The server runs via supervisor on port 8001:
```bash
sudo supervisorctl restart backend
```

## API Endpoints

### Base URL
```
http://localhost:8001
```

### 1. Health Check
**GET** `/`
```bash
curl http://localhost:8001/
```

**Response:**
```json
{
  "message": "Supply Chain Management API",
  "version": "1.0.0",
  "endpoints": {
    "register": "/api/register",
    "login": "/api/login"
  }
}
```

### 2. User Registration
**POST** `/api/register`

Register a new user with role-based profile creation.

**Request Body:**
```json
{
  "username": "string (3-100 chars, required)",
  "password": "string (min 6 chars, required)",
  "role": "farmer | mandi_owner | retailer | admin (required)",
  "contact": "string (optional)",
  "location": "string (optional)",
  "language": "string (optional)"
}
```

**Example - Register Farmer:**
```bash
curl -X POST http://localhost:8001/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "farmer1",
    "password": "password123",
    "role": "farmer",
    "contact": "+919876543210",
    "location": "Punjab, India",
    "language": "Punjabi"
  }'
```

**Example - Register Mandi Owner:**
```bash
curl -X POST http://localhost:8001/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "mandi_owner1",
    "password": "secure456",
    "role": "mandi_owner",
    "contact": "+919123456789",
    "location": "Amritsar",
    "language": "Hindi"
  }'
```

**Example - Register Retailer:**
```bash
curl -X POST http://localhost:8001/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "retailer1",
    "password": "retail789",
    "role": "retailer",
    "contact": "+919988776655",
    "location": "Delhi",
    "language": "Hindi"
  }'
```

**Success Response (201 Created):**
```json
{
  "id": 1,
  "username": "farmer1",
  "role": "farmer",
  "contact": "+919876543210",
  "location": "Punjab, India"
}
```

**Error Response (400 Bad Request):**
```json
{
  "detail": "Username already registered"
}
```

### 3. User Login
**POST** `/api/login`

Authenticate user and receive JWT token with role information.

**Request Body:**
```json
{
  "username": "string (required)",
  "password": "string (required)"
}
```

**Example:**
```bash
curl -X POST http://localhost:8001/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "farmer1",
    "password": "password123"
  }'
```

**Success Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "role": "farmer",
  "username": "farmer1",
  "user_id": 1
}
```

**Error Response (401 Unauthorized):**
```json
{
  "detail": "Invalid username or password"
}
```

### 4. Health Check
**GET** `/api/health`

```bash
curl http://localhost:8001/api/health
```

**Response:**
```json
{
  "status": "healthy",
  "service": "Supply Chain API"
}
```

## Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Register** a new user using `/api/register`
2. **Login** using `/api/login` to receive a JWT token
3. **Include** the token in subsequent requests:
   ```
   Authorization: Bearer <your_token_here>
   ```

### Token Contents
The JWT token includes:
- `sub`: username
- `user_id`: user's database ID
- `role`: user's role (farmer, mandi_owner, retailer, admin)
- `exp`: expiration timestamp (30 minutes by default)

## Security Features

1. **Password Hashing**: Uses bcrypt for secure password storage
2. **JWT Tokens**: Secure token-based authentication
3. **Role Validation**: Ensures only valid roles are assigned
4. **SQL Injection Protection**: SQLAlchemy ORM prevents SQL injection
5. **CORS**: Configured for cross-origin requests

## Database Queries

### View All Users
```bash
sudo -u postgres psql -d supply_chain_db -c "SELECT id, username, role, contact, location FROM users;"
```

### View Farmer Profiles
```bash
sudo -u postgres psql -d supply_chain_db -c "SELECT f.id, f.user_id, f.language, u.username FROM farmer f JOIN users u ON f.user_id = u.id;"
```

### View All Tables
```bash
sudo -u postgres psql -d supply_chain_db -c "\dt"
```

## Service Management

### Check Backend Status
```bash
sudo supervisorctl status backend
```

### Restart Backend
```bash
sudo supervisorctl restart backend
```

### View Backend Logs
```bash
tail -f /var/log/supervisor/backend.err.log
```

## Interactive API Documentation

FastAPI provides automatic interactive documentation:
- **Swagger UI**: http://localhost:8001/docs
- **ReDoc**: http://localhost:8001/redoc

## Testing

All endpoints have been tested and verified:
✅ User registration (farmer, mandi_owner, retailer)
✅ User login with JWT token generation
✅ Password validation
✅ Duplicate username prevention
✅ Role-based profile creation
✅ Database table creation
✅ Password hashing with bcrypt

## Future Enhancements

To complete the supply chain system, additional endpoints needed:
- CRUD operations for crops, mandi items, retailer items
- Order management (create, view, update orders)
- Alert system APIs
- User profile management
- Search and filter functionality
- Analytics and reporting

## Notes

- PostgreSQL service must be running
- Default token expiration: 30 minutes
- All passwords are hashed using bcrypt
- Database migrations are automatic on startup
- Backend runs on port 8001 with auto-reload enabled
