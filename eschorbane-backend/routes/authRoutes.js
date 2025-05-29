const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.get('/me', protect, getMe); // Exemple de route protégée

module.exports = router;