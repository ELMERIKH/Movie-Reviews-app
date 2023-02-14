const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Movie = require('../models/movie');

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

router.get("/getRole/:email", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email });
      if (!user.role) return res.status(404).send("User not found");
      res.send({ role: user.role });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  

  module.exports = router;
  
  