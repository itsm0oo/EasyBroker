const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/userAuth', { useNewUrlParser: true, useUnifiedTopology: true });

// Create User Schema and Model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Sign Up Route
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;

  // Check if email exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'User created successfully!' });
});

// Sign In Route
app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  // Check password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Generate JWT
  const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

  res.json({ message: 'Sign-in successful', token });
});

// Server Setup
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
