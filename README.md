# GEU Bus Tracking System

A full-stack bus tracking application for Graphic Era University, enabling students to track buses in real-time and drivers to manage routes efficiently.

## 📁 Project Structure

```
NEW-PROJECT/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── Login.jsx           # Login & Register Component
│   │   ├── pages/
│   │   │   ├── StudentDashboard.jsx # Student Dashboard
│   │   │   ├── DriverDashboard.jsx  # Driver Dashboard
│   │   │   └── Dashboard.css        # Dashboard Styles
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx       # React Router Configuration
│   │   ├── services/
│   │   │   └── authService.js      # API Service Layer
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── App.css
│   │   └── login.css               # Login Form Styles
│   ├── .env.example                # Environment Variables Template
│   └── package.json
│
└── backend/
    ├── server.js                   # Express Server Entry Point
    ├── config/
    │   └── db.js                   # MongoDB Configuration
    ├── models/
    │   └── User.js                 # User Schema & Model
    ├── controllers/
    │   └── authController.js       # Authentication Logic
    ├── routes/
    │   └── authRoutes.js           # Auth API Routes
    ├── middleware/
    │   └── authMiddleware.js       # JWT & Role Verification
    ├── .env.example                # Environment Variables Template
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure MongoDB:**
   - Update `MONGODB_URI` in `.env`
   - Default: `mongodb://localhost:27017/geu-bus-tracking`
   - For MongoDB Atlas, use: `mongodb+srv://username:password@cluster.mongodb.net/geu-bus-tracking`

5. **Set JWT Secret:**
   - Update `JWT_SECRET` in `.env` with a strong key

6. **Start the server:**
   ```bash
   npm run dev    # Development (with nodemon)
   npm start      # Production
   ```

   Server runs on: `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   cp .env.example .env
   ```

4. **Configure API URL:**
   - Default: `http://localhost:5000/api`

5. **Start the development server:**
   ```bash
   npm run dev
   ```

   Frontend runs on: `http://localhost:5173`

## 📚 API Endpoints

### Authentication

**Register (Students Only)**
```
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

Response:
{
  "success": true,
  "message": "Registration successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

**Login (Students & Drivers)**
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

**Get Current User**
```
GET /api/auth/me
Authorization: Bearer {token}

Response:
{
  "success": true,
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }
}
```

## 🔐 Authentication Flow

1. **User Registration** → Passwords hashed with bcryptjs → User stored in MongoDB
2. **User Login** → Password validated → JWT token generated and returned
3. **JWT Token** → Stored in localStorage on client side
4. **Protected Routes** → Token added to Authorization header for API calls
5. **Token Validation** → Backend verifies token before allowing access
6. **Role-based Access** → Redirects users to appropriate dashboard (student/driver)

## 🛠️ Features

### Frontend
- ✅ Professional Login/Register UI
- ✅ Real-time form validation
- ✅ JWT token management
- ✅ Protected routes based on user roles
- ✅ Student Dashboard with bus tracking
- ✅ Driver Dashboard with bus management
- ✅ Responsive design for mobile & desktop
- ✅ Error handling and user feedback

### Backend
- ✅ Express.js REST API
- ✅ MongoDB database integration
- ✅ User authentication with JWT
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control
- ✅ Request validation
- ✅ Error handling middleware
- ✅ CORS enabled

## 📦 Dependencies

### Backend
- `express` - Web framework
- `mongoose` - MongoDB ORM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT creation & verification
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variables

### Frontend
- `react` - UI library
- `react-router-dom` - Client-side routing
- `axios` - HTTP client

## 🔄 Data Flow

```
USER INTERFACE (React)
        ↓
    Auth Service (axios)
        ↓
    Backend API (Express)
        ↓
    Authentication Middleware (JWT)
        ↓
    Controllers (Business Logic)
        ↓
    MongoDB (Data Storage)
```

## 🧪 Testing the Application

### Test Student Flow
1. Register with any email and password
2. Should redirect to `/student` dashboard
3. View available buses and tracking info

### Test Driver Flow
1. Use backend to create a driver user (with role: "driver")
   ```javascript
   // Example MongoDB query
   db.users.insertOne({
     name: "Driver Name",
     email: "driver@example.com",
     password: "hashed_password",
     role: "driver"
   })
   ```
2. Login with driver credentials
3. Should redirect to `/driver` dashboard
4. View bus status and management options

## 🐛 Troubleshooting

### Connection Issues
- Check if MongoDB is running locally
- Verify MongoDB URI in .env
- Check if backend server is running on port 5000

### CORS Errors
- Ensure backend has CORS enabled
- Check frontend API URL in .env

### Authentication Errors
- Clear localStorage and try again
- Verify JWT_SECRET is same on backend
- Check token expiration (default: 7 days)

## 🔒 Security Considerations

1. **JWT Secret** - Change `JWT_SECRET` in production to a strong key
2. **Password Hashing** - Passwords hashed with bcryptjs (10 salt rounds)
3. **Token Expiration** - Tokens expire in 7 days
4. **HTTPS** - Use HTTPS in production
5. **Environment Variables** - Never commit .env to repository

## 📝 Future Enhancements

- Real-time bus location tracking with WebSockets
- Push notifications for bus arrivals
- SMS/Email notifications
- Admin dashboard
- Payment integration
- Mobile app
- Analytics and reporting

## 📄 License

This project is part of Graphic Era University.

## 📞 Support

For issues or questions, contact the development team.
