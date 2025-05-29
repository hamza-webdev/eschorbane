const { NewsArticle, User } = require('../models');
const { Op } = require('sequelize');

// Helper pour générer un slug (simpliste)
const generateSlug = (title) => {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
};

exports.createNewsArticle = async (req, res) => {
  const { title_ar, title_fr, content_ar, content_fr, category, thumbnailUrl, videoUrl } = req.body;
  // L'ID de l'auteur devrait venir de l'utilisateur authentifié (req.user.id)
  const authorId = req.user ? req.user.id : null; // Assurez-vous que authMiddleware est utilisé

  if (!authorId) {
    return res.status(401).json({ message: "User not authenticated to create article."})
  }

  try {
    const slug = generateSlug(title_ar || title_fr || `news-${Date.now()}`);
    const article = await NewsArticle.create({
      title_ar,
      title_fr,
      content_ar,
      content_fr,
      slug,
      category,
      thumbnailUrl,
      videoUrl,
      authorId,
    });
    res.status(201).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating news article', error: error.message });
  }
};

exports.getAllNewsArticles = async (req, res) => {
  try {
    const { limit = 10, offset = 0, category } = req.query;
    const whereClause = {};
    if (category) {
      whereClause.category = category;
    }

    const articles = await NewsArticle.findAndCountAll({
      where: whereClause,
      include: [{ model: User, as: 'author', attributes: ['id', 'username'] }],
      order: [['publicationDate', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching news articles' });
  }
};

exports.getNewsArticleBySlug = async (req, res) => {
  try {
    const article = await NewsArticle.findOne({
      where: { slug: req.params.slug },
      include: [{ model: User, as: 'author', attributes: ['id', 'username'] }],
    });
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching news article' });
  }
};

// Ajoutez ici les fonctions updateNewsArticle et deleteNewsArticle