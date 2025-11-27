const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// ======================
// REGISTER ROUTE (Create new user)
// ======================
router.post('/register', async (req, res) => {
  try {
    const { employeeId, password, name, email } = req.body;

    // Validate input
    if (!employeeId || !password || !name || !email) {
      return res.status(400).json({ 
        success: false,
        error: 'Please provide all required fields' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ employeeId }, { email }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        error: 'Employee ID or Email already exists' 
      });
    }

    // Hash password (10 rounds of salt)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      employeeId,
      password: hashedPassword,
      name,
      email
    });

    await user.save();

    console.log(`✅ New user registered: ${employeeId}`);

    res.status(201).json({ 
      success: true,
      message: 'User registered successfully',
      user: {
        employeeId: user.employeeId,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error during registration' 
    });
  }
});

// ======================
// LOGIN ROUTE
// ======================
router.post('/login', async (req, res) => {
  try {
    const { employeeId, password } = req.body;

    // Validate input
    if (!employeeId || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Please provide Employee ID and Password' 
      });
    }

    // Find user in database
    const user = await User.findOne({ employeeId });
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: 'Invalid Employee ID or Password' 
      });
    }

    // TEMPORARY: Compare plain text password (NOT SECURE!)
const isPasswordValid = password === user.password;

if (!isPasswordValid) {
  return res.status(401).json({ 
    success: false,
    error: 'Invalid Employee ID or Password' 
  });
}

    // Create JWT token (expires in 24 hours)
    const token = jwt.sign(
      { 
        userId: user._id,
        employeeId: user.employeeId 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log(`✅ User logged in: ${employeeId}`);

    // Send success response
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        employeeId: user.employeeId,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error during login' 
    });
  }
});

// ======================
// VERIFY TOKEN ROUTE (Optional - for auto-login)
// ======================
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'No token provided' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: 'User not found' 
      });
    }

    res.json({
      success: true,
      user: {
        employeeId: user.employeeId,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(401).json({ 
      success: false,
      error: 'Invalid token' 
    });
  }
});

module.exports = router;