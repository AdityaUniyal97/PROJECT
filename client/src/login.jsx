import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  // Login states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Register states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);
  const [regErrors, setRegErrors] = useState({});
  const [regIsLoading, setRegIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Enter a valid email address';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = () => {
    const newErrors = {};
    
    if (!regName.trim()) {
      newErrors.name = 'Full name is required';
    } else if (regName.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!regEmail.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail)) {
      newErrors.email = 'Enter a valid email address';
    }
    
    if (!regPassword) {
      newErrors.password = 'Password is required';
    } else if (regPassword.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!regConfirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (regPassword !== regConfirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setRegErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        console.log('Login successful:', { email, password, rememberMe });
        setIsLoading(false);
        alert('Login successful! Welcome to GEU Bus Tracking System');
        // Redirect or store auth token here
      }, 1000);
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) {
      return;
    }

    setRegIsLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        console.log('Registration successful:', { regName, regEmail });
        setRegIsLoading(false);
        alert('Account created successfully! Please sign in with your credentials.');
        // Reset form and switch to login
        setRegName('');
        setRegEmail('');
        setRegPassword('');
        setRegConfirmPassword('');
        setIsLogin(true);
      }, 1000);
    } catch (error) {
      console.error('Registration error:', error);
      setRegIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left-panel">
        <div className="left-content">
          <div className="logo">
            <span className="logo-text">GEU</span>
          </div>
          <h2>Bus Tracking System</h2>
          <p>Graphic Era University</p>
          <div className="features">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Real-time bus tracking</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Schedule management</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <span>Secure access</span>
            </div>
          </div>
        </div>
      </div>

      <div className="login-right-panel">
        <div className="auth-container">
          {/* Toggle Buttons */}
          <div className="auth-toggle">
            <button
              className={`toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button
              className={`toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>

          {/* Login Form */}
          <div className={`auth-form login-form-wrapper ${isLogin ? 'active' : ''}`}>
            <div className="login-card">
              <h1>Welcome Back</h1>
              <p className="subtitle">Sign in to your account</p>

              <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <div className="password-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors({ ...errors, password: '' });
                      }}
                      className={errors.password ? 'input-error' : ''}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-options">
                  <label className="remember-me">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#forgot-password" className="forgot-link">Forgot Password?</a>
                </div>

                <button
                  type="submit"
                  className={`submit-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              <div className="footer-links">
                <a href="#help">Help</a>
                <a href="#privacy">Privacy</a>
                <a href="#terms">Terms</a>
              </div>
            </div>
          </div>

          {/* Register Form */}
          <div className={`auth-form register-form-wrapper ${!isLogin ? 'active' : ''}`}>
            <div className="login-card">
              <h1>Create Account</h1>
              <p className="subtitle">Join GEU Bus Tracking System</p>

              <form onSubmit={handleRegisterSubmit} className="login-form">
                <div className="form-group">
                  <label htmlFor="regName">Full Name</label>
                  <input
                    type="text"
                    id="regName"
                    placeholder="Enter your full name"
                    value={regName}
                    onChange={(e) => {
                      setRegName(e.target.value);
                      if (regErrors.name) setRegErrors({ ...regErrors, name: '' });
                    }}
                    className={regErrors.name ? 'input-error' : ''}
                  />
                  {regErrors.name && <span className="error-message">{regErrors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="regEmail">Email Address</label>
                  <input
                    type="email"
                    id="regEmail"
                    placeholder="name@example.com"
                    value={regEmail}
                    onChange={(e) => {
                      setRegEmail(e.target.value);
                      if (regErrors.email) setRegErrors({ ...regErrors, email: '' });
                    }}
                    className={regErrors.email ? 'input-error' : ''}
                  />
                  {regErrors.email && <span className="error-message">{regErrors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="regPassword">Password</label>
                  <div className="password-wrapper">
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      id="regPassword"
                      placeholder="Create a password"
                      value={regPassword}
                      onChange={(e) => {
                        setRegPassword(e.target.value);
                        if (regErrors.password) setRegErrors({ ...regErrors, password: '' });
                      }}
                      className={regErrors.password ? 'input-error' : ''}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      title={showRegPassword ? 'Hide password' : 'Show password'}
                    >
                      {showRegPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {regErrors.password && <span className="error-message">{regErrors.password}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="regConfirmPassword">Confirm Password</label>
                  <div className="password-wrapper">
                    <input
                      type={showRegConfirmPassword ? 'text' : 'password'}
                      id="regConfirmPassword"
                      placeholder="Confirm password"
                      value={regConfirmPassword}
                      onChange={(e) => {
                        setRegConfirmPassword(e.target.value);
                        if (regErrors.confirmPassword) setRegErrors({ ...regErrors, confirmPassword: '' });
                      }}
                      className={regErrors.confirmPassword ? 'input-error' : ''}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                      title={showRegConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showRegConfirmPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {regErrors.confirmPassword && <span className="error-message">{regErrors.confirmPassword}</span>}
                </div>

                <button
                  type="submit"
                  className={`submit-btn ${regIsLoading ? 'loading' : ''}`}
                  disabled={regIsLoading}
                >
                  {regIsLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>

              <div className="footer-links">
                <a href="#help">Help</a>
                <a href="#privacy">Privacy</a>
                <a href="#terms">Terms</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
