# 📡 API Documentation

## Base URL
```
http://localhost:5000/api
```

---

## Authentication Endpoints

### 1. Register User (Student Only)

**Endpoint:** `POST /auth/register`

**Description:** Create a new student account. Only students can register through this endpoint.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Student Name",
  "email": "student@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Student Name",
    "email": "student@example.com",
    "role": "student"
  }
}
```

**Error Response (400/409):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

**Validation Rules:**
- `name`: Required, min 2 characters
- `email`: Required, valid email format, must be unique
- `password`: Required, min 6 characters
- `confirmPassword`: Must match password

---

### 2. Login User (Student & Driver)

**Endpoint:** `POST /auth/login`

**Description:** Authenticate a user and receive JWT token. Works for both students and drivers.

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "User Name",
    "email": "user@example.com",
    "role": "student",
    "vehicleNumber": null
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

**Validation Rules:**
- `email`: Required, valid email format
- `password`: Required, min 6 characters

---

### 3. Get Current User (Protected)

**Endpoint:** `GET /auth/me`

**Description:** Get the authenticated user's profile. Requires valid JWT token.

**Request Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "User Name",
    "email": "user@example.com",
    "role": "student",
    "vehicleNumber": null
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid or expired token"
}
```

---

## Authentication Flow

### Step 1: Register or Login
```
POST /auth/register  (Students)
or
POST /auth/login     (Students & Drivers)
```
↓ Receive JWT token

### Step 2: Store Token
```javascript
localStorage.setItem('token', response.data.token);
```

### Step 3: Use Token for Protected Requests
```
Authorization: Bearer {token}
```

### Step 4: Token Expiration
- Default expiration: **7 days**
- Expired tokens will return 401 error
- User needs to login again

---

## Error Handling

### Common Error Codes

| Code | Message | Solution |
|------|---------|----------|
| 400 | All fields are required | Fill in all form fields |
| 400 | Passwords do not match | Ensure passwords match |
| 401 | Invalid email or password | Check credentials |
| 401 | Invalid or expired token | Login again to get new token |
| 403 | Access denied | Insufficient permissions |
| 409 | Email already registered | Use different email |
| 500 | Server error | Contact support |

---

## JWT Token Structure

Token includes:
```javascript
{
  id: "user_id",
  email: "user@example.com",
  role: "student",  // or "driver"
  iat: 1234567890,
  exp: 1234654290
}
```

**Token Location:** `Authorization` header as `Bearer {token}`

---

## Response Format

All API responses follow this format:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

## Postman Collection

### Setup Authorization
1. Get token from login endpoint
2. Go to Authorization tab
3. Select type: **Bearer Token**
4. Paste token in value field
5. Token will be auto-added to `Authorization: Bearer {token}` header

### Example Request in Postman
```
GET http://localhost:5000/api/auth/me
Headers:
  Authorization: Bearer eyJhbGc...
  Content-Type: application/json
```

---

## Rate Limiting
Currently, no rate limiting is implemented. 
Can be added in future versions.

---

## CORS Policy
CORS is enabled for development:
- Origin: `*` (all origins)
- Methods: `GET, POST, PUT, DELETE, OPTIONS`
- Headers: `Content-Type, Authorization`

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get User (Protected)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json"
```

---

## Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required, min: 2),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (student | driver),
  vehicleNumber: String (optional, for drivers),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2024-12-31 | Initial release with auth endpoints |

---

## Support

For API issues or questions, contact: support@geu.edu
