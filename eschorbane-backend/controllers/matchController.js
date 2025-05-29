const { Match, Team } = require('../models');
const { Op } = require('sequelize');

exports.createMatch = async (req, res) => {
  // Pour l'instant, création basique. En réalité, il faudrait valider les IDs des équipes, etc.
  const { homeTeamId, awayTeamId, matchDatetimeUtc, stadiumName_ar, stadiumName_fr, competitionName_ar, competitionName_fr, status } = req.body;
  try {
    const match = await Match.create({
      homeTeamId,
      awayTeamId,
      matchDatetimeUtc,
      stadiumName_ar,
      stadiumName_fr,
      competitionName_ar,
      competitionName_fr,
      status
    });
    res.status(201).json(match);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating match', error: error.message });
  }
};

exports.getAllMatches = async (req, res) => {
  try {
    const { limit = 20, offset = 0, status, upcoming, past } = req.query;
    const whereClause = {};
    let order = [['matchDatetimeUtc', 'ASC']]; // Par défaut, les plus anciens d'abord

    if (status) whereClause.status = status;
    if (upcoming === 'true') {
      whereClause.matchDatetimeUtc = { [Op.gte]: new Date() };
      whereClause.status = { [Op.notIn]: ['FULL_TIME', 'CANCELLED'] }; // Exclure les matchs déjà terminés ou annulés
      order = [['matchDatetimeUtc', 'ASC']]; // Prochains matchs: du plus proche au plus lointain
    }
    if (past === 'true') {
      whereClause.matchDatetimeUtc = { [Op.lt]: new Date() };
      whereClause.status = 'FULL_TIME'; // Uniquement les matchs terminés
      order = [['matchDatetimeUtc', 'DESC']]; // Matchs passés: du plus récent au plus ancien
    }

    const matches = await Match.findAndCountAll({
      where: whereClause,
      include: [
        { model: Team, as: 'homeTeam', attributes: ['id', 'name', 'logoUrl'] },
        { model: Team, as: 'awayTeam', attributes: ['id', 'name', 'logoUrl'] },
      ],
      order: order,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching matches' });
  }
};

exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id, {
      include: [
        { model: Team, as: 'homeTeam', attributes: ['id', 'name', 'logoUrl'] },
        { model: Team, as: 'awayTeam', attributes: ['id', 'name', 'logoUrl'] },
      ],
    });
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.json(match);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching match' });
  }
};

// Ajoutez updateMatch (pour les scores, status), deleteMatch