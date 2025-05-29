const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Le token expire dans 30 jours
  });
};

exports.registerUser = async (req, res) => {
  const { username, email, password, role, languagePreference } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const userByUsername = await User.findOne({ where: { username } });
    if (userByUsername) {
        return res.status(400).json({ message: 'Username already taken' });
    }

    const user = await User.create({
      username,
      email,
      passwordHash: password, // Le hook s'occupera du hachage
      role,
      languagePreference
    });

    if (user) {
      res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (user && (await user.isValidPassword(password))) {
      res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during login' });
  }
};