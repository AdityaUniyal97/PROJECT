# 📖 Developer Quick Reference

## Common Commands

### Backend
```bash
# Install dependencies
cd backend && npm install

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start

# Check MongoDB connection
npm run test:db  # (if added later)
```

### Frontend
```bash
# Install dependencies
cd client && npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## Environment Variables

### Backend (.env)
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/geu-bus-tracking
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:5000/api
```

---

## Quick API Tests

### Register Student
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"123456","confirmPassword":"123456"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'
```

### Get User (Protected)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## File Structure Quick Lookup

| Need to modify... | Look in... |
|---|---|
| Authentication logic | `backend/controllers/authController.js` |
| User schema/validation | `backend/models/User.js` |
| API endpoints | `backend/routes/authRoutes.js` |
| Route protection | `backend/middleware/authMiddleware.js` |
| Login/Register UI | `client/src/components/Login.jsx` |
| API service layer | `client/src/services/authService.js` |
| Route setup | `client/src/routes/AppRoutes.jsx` |
| Student dashboard | `client/src/pages/StudentDashboard.jsx` |
| Driver dashboard | `client/src/pages/DriverDashboard.jsx` |
| Login styles | `client/src/login.css` |
| Dashboard styles | `client/src/pages/Dashboard.css` |

---

## Debugging Tips

### Frontend Errors
1. Check browser console: `F12` → Console tab
2. Check Network tab for API calls
3. Check localStorage: `localStorage.getItem('token')`
4. Check `window.__REDUX_DEVTOOLS_EXTENSION__` if using Redux

### Backend Errors
1. Check terminal output for errors
2. Check MongoDB logs
3. Test endpoint with Postman
4. Add `console.log()` for debugging
5. Use `debugger;` statement and `node --inspect`

### Common Issues
```
CORS Error → Check backend PORT and API URL in frontend .env
401 Unauthorized → Token expired or invalid, login again
MongoDB Error → Check if mongod is running
Port Already in Use → Kill process on that port
```

---

## Code Patterns

### Creating Protected Routes
```jsx
<ProtectedRoute requiredRole="student">
  <StudentDashboard />
</ProtectedRoute>
```

### Making API Calls
```javascript
import authService from '../services/authService';

const response = await authService.login(email, password);
if (response.success) {
  // Handle success
}
```

### Storing Data in localStorage
```javascript
localStorage.setItem('token', tokenValue);
const token = localStorage.getItem('token');
localStorage.removeItem('token');
```

### Adding Error Messages
```jsx
{apiError && (
  <div className="alert alert-error">
    {apiError}
  </div>
)}
```

---

## Database Queries (MongoDB)

### Create Test User
```javascript
db.users.insertOne({
  name: "Test Driver",
  email: "driver@test.com",
  password: "$2a$10$...",  // hashed password
  role: "driver",
  vehicleNumber: "DL-01-AB-1234",
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date()
})
```

### Find User by Email
```javascript
db.users.findOne({ email: "test@example.com" })
```

### Update User
```javascript
db.users.updateOne(
  { _id: ObjectId("...") },
  { $set: { isActive: false } }
)
```

### Delete User
```javascript
db.users.deleteOne({ email: "test@example.com" })
```

---

## Useful Browser Extensions

1. **Redux DevTools** - State management debugging
2. **Postman** - API testing
3. **MongoDB Compass** - Database GUI
4. **VS Code REST Client** - Test APIs in editor

---

## Performance Tips

### Frontend
- Use `React.memo()` for expensive components
- Lazy load routes with `React.lazy()`
- Minimize re-renders with proper use of `useState`
- Use `useCallback` for functions in dependencies

### Backend
- Index frequently queried fields in MongoDB
- Use pagination for large datasets
- Cache responses where appropriate
- Compress responses with gzip

---

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Use HTTPS in production
- [ ] Validate all input on backend
- [ ] Don't log sensitive data
- [ ] Use environment variables for secrets
- [ ] Enable CORS properly (not * in production)
- [ ] Set password length minimum
- [ ] Implement rate limiting
- [ ] Use secure cookies if applicable
- [ ] Regular security audits

---

## Git Workflow

```bash
# Clone repository
git clone <repo-url>
cd NEW-PROJECT

# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "Add my feature"

# Push to remote
git push origin feature/my-feature

# Create pull request on GitHub
# After review, merge to main
```

---

## Deployment Checklist

- [ ] Test all features in staging
- [ ] Update environment variables
- [ ] Build frontend: `npm run build`
- [ ] Run migrations if needed
- [ ] Backup database
- [ ] Monitor logs after deployment
- [ ] Test critical user flows
- [ ] Setup monitoring/alerts
- [ ] Document any breaking changes

---

## Learning Resources

### Frontend
- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)
- [Axios Docs](https://axios-http.com)

### Backend
- [Express Docs](https://expressjs.com)
- [Mongoose Docs](https://mongoosejs.com)
- [JWT.io](https://jwt.io)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

### Database
- [MongoDB Docs](https://docs.mongodb.com)
- [MongoDB University](https://university.mongodb.com)

---

## FAQ

**Q: How do I reset my password?**
A: Currently not implemented. Manually update in MongoDB or add forgot-password endpoint.

**Q: How do I change user role?**
A: Update `role` field in MongoDB user document. Roles: "student" or "driver"

**Q: How do I test driver login?**
A: Create driver user in MongoDB with role="driver", then login.

**Q: Token expired, what to do?**
A: Login again to get new token. Change JWT expiry in authController if needed.

**Q: How do I see what token contains?**
A: Paste token at [jwt.io](https://jwt.io) to decode it.

**Q: How do I add new API endpoint?**
A: Create route in `authRoutes.js` → controller function → test with Postman

**Q: Can I run both frontend and backend together?**
A: Open two terminals, run `npm run dev` in each directory separately.

---

## Getting Help

1. **Check Documentation** - README.md, SETUP.md, API_DOCS.md
2. **Check Architecture** - ARCHITECTURE.md for system design
3. **Check Error Messages** - Read console/terminal output carefully
4. **Check Code** - Read related files to understand logic
5. **Test with Postman** - Isolate frontend vs backend issues
6. **Google/Stack Overflow** - Most issues have been solved before

---

## Last Updated
December 31, 2024

## Project Status
✅ Development Ready

---

Happy Coding! 🚀
