# 🚀 Installation & Setup Guide

## Step-by-Step Setup Instructions

### Step 1: Backend Setup

#### 1.1 Install Dependencies
```bash
cd backend
npm install
```

#### 1.2 Create .env file
```bash
cp .env.example .env
```

Edit `.env` and configure:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/geu-bus-tracking
JWT_SECRET=your-super-secret-key-12345
NODE_ENV=development
```

#### 1.3 Start MongoDB
```bash
# Windows (if using local MongoDB)
mongod

# Or use MongoDB Atlas (cloud) - update MONGODB_URI in .env
```

#### 1.4 Start Backend Server
```bash
npm run dev    # Development mode (with auto-reload)
# OR
npm start      # Production mode
```

✅ Backend should be running on: `http://localhost:5000`

---

### Step 2: Frontend Setup

#### 2.1 Install Dependencies
```bash
cd client
npm install
```

#### 2.2 Create .env file
```bash
cp .env.example .env
```

Edit `.env`:
```
VITE_API_URL=http://localhost:5000/api
```

#### 2.3 Start Frontend Development Server
```bash
npm run dev
```

✅ Frontend should be running on: `http://localhost:5173`

---

## 🧪 Testing the Application

### 1. Test Student Registration & Login
1. Open `http://localhost:5173` in your browser
2. Click "Sign Up" tab
3. Fill in the registration form:
   - Name: John Doe
   - Email: student@example.com
   - Password: password123
   - Confirm Password: password123
4. Click "Create Account"
5. Should redirect to Student Dashboard automatically

### 2. Test Driver Login
Driver accounts need to be created manually in MongoDB:

**Option A: Using MongoDB Compass**
1. Open MongoDB Compass
2. Connect to `mongodb://localhost:27017`
3. Database: `geu-bus-tracking`
4. Collection: `users`
5. Insert document:
```json
{
  "name": "Driver Name",
  "email": "driver@example.com",
  "password": "$2a$10$...", // Hashed password (see Option B)
  "role": "driver",
  "vehicleNumber": "DL-01-AB-1234",
  "isActive": true,
  "createdAt": {"$date": "2024-12-31T00:00:00Z"}
}
```

**Option B: Using Node.js script**
```bash
cd backend
node
```

```javascript
import bcryptjs from 'bcryptjs';

const password = 'password123';
const salt = await bcryptjs.genSalt(10);
const hashedPassword = await bcryptjs.hash(password, salt);
console.log(hashedPassword);
// Use this hash in the database
```

Then login with:
- Email: driver@example.com
- Password: password123

---

## 📊 API Testing with Postman

### 1. Register Student
**POST** `http://localhost:5000/api/auth/register`

Headers:
```
Content-Type: application/json
```

Body:
```json
{
  "name": "John Student",
  "email": "student@test.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

### 2. Login
**POST** `http://localhost:5000/api/auth/login`

Headers:
```
Content-Type: application/json
```

Body:
```json
{
  "email": "student@test.com",
  "password": "password123"
}
```

Response will contain `token` - Copy this for authenticated requests.

### 3. Get Current User (Protected)
**GET** `http://localhost:5000/api/auth/me`

Headers:
```
Authorization: Bearer {paste_token_here}
```

---

## 🔧 Troubleshooting

### Issue: MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Ensure MongoDB is running: `mongod`
- Or update MONGODB_URI to MongoDB Atlas URL

### Issue: CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
- Backend already has CORS enabled
- Check frontend .env has correct API URL
- Restart both servers

### Issue: JWT Token Error
```
Invalid or expired token
```

**Solution:**
- Clear localStorage in browser DevTools → Application → Local Storage
- Login again to get a new token
- Check JWT_SECRET is consistent between servers

### Issue: Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
- Kill process on port 5000:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5000
kill -9 <PID>
```

---

## ✅ Verification Checklist

- [ ] MongoDB running
- [ ] Backend server running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can open `http://localhost:5173` in browser
- [ ] Registration form works
- [ ] Login redirects to student dashboard
- [ ] Logout clears token and redirects to home

---

## 📚 Project Structure Reminder

```
NEW-PROJECT/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/Login.jsx
│   │   ├── pages/StudentDashboard.jsx
│   │   ├── pages/DriverDashboard.jsx
│   │   ├── routes/AppRoutes.jsx
│   │   ├── services/authService.js
│   │   └── App.jsx
│   ├── .env
│   └── package.json
│
└── backend/                   # Express Backend
    ├── server.js
    ├── config/db.js
    ├── models/User.js
    ├── controllers/authController.js
    ├── routes/authRoutes.js
    ├── middleware/authMiddleware.js
    ├── .env
    └── package.json
```

---

## 🎉 You're All Set!

The application is now ready for development. Happy coding! 🚀
