const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { name, username, email, password } = req.body;

  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) return res.status(400).json({ message: "Username or Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, username, email, password: hashedPassword });

  res.status(201).json({ _id: user.id, username, email, token: generateToken(user.id) });
});

// Login User
router.post('/login', async (req, res) => {
  const { emailOrUsername, password } = req.body;
  const user = await User.findOne({ 
    $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ _id: user.id, username: user.username, email: user.email, token: generateToken(user.id) });
});

module.exports = router;
