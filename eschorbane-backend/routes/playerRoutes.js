const express = require('express');
const { createPlayer, getAllPlayers, getPlayerById } = require('../controllers/playerController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// La création de joueur devrait être protégée
router.post('/', protect, createPlayer);
router.get('/', getAllPlayers);
router.get('/:id', getPlayerById);

module.exports = router;