const express = require('express');
const { createMatch, getAllMatches, getMatchById } = require('../controllers/matchController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// La création de match devrait être protégée
router.post('/', protect, createMatch);
router.get('/', getAllMatches);
router.get('/:id', getMatchById);

module.exports = router;