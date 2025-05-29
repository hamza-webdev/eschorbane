const express = require('express');
const { createNewsArticle, getAllNewsArticles, getNewsArticleBySlug } = require('../controllers/newsController');
const { protect } = require('../middlewares/authMiddleware'); // Pour protéger la création d'articles

const router = express.Router();

// Seuls les utilisateurs authentifiés (ex: admin, staff) peuvent créer des articles
router.post('/', protect, createNewsArticle); // Assurez-vous que le rôle est vérifié dans le contrôleur ou un autre middleware

router.get('/', getAllNewsArticles);
router.get('/:slug', getNewsArticleBySlug);

module.exports = router;