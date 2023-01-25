const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username , email, password, } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
          email,
            password: hashedPassword,
            
        });
        const savedUser = await user.save();
        res.status(201).json({ message: 'User created successfully', user: savedUser });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        const { username ,email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }
        const token = jwt.sign({ email: user.email, role: user.role }, process.env.SECRET_KEY);
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Middleware function to check if the user has the "admin" role
const checkAdmin = (req, res, next) => {
    try {
        const { role } = req.decoded;
        if (role !== 'admin') {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        next();
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

// Middleware function to check if the user is authenticated
const checkJWT = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status
          }
          req.decoded = decoded;
          next();
      });
  };
  
  // Example of a route that is protected with the "checkJWT" and "checkAdmin" middleware functions
  router.get('/login/base', checkJWT, checkAdmin, (req, res) => {
      // only users with the "admin" role will have access to this route
  });
  
  module.exports = router;
  