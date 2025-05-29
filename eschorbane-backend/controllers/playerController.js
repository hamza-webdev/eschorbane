const { Player, Team } = require('../models');

exports.createPlayer = async (req, res) => {
  const { firstName, lastName, jerseyNumber, position, dateOfBirth, nationality, photoUrl, teamId } = req.body;
  try {
    // Vérifier si l'équipe existe (optionnel, mais bonne pratique)
    if (teamId) {
        const team = await Team.findByPk(teamId);
        if (!team) {
            return res.status(400).json({ message: `Team with ID ${teamId} not found.` });
        }
    }

    const player = await Player.create({
      firstName,
      lastName,
      jerseyNumber,
      position,
      dateOfBirth,
      nationality,
      photoUrl,
      teamId,
    });
    res.status(201).json(player);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating player', error: error.message });
  }
};

exports.getAllPlayers = async (req, res) => {
  try {
    const { teamId } = req.query; // Filtrer par équipe si teamId est fourni
    const whereClause = {};
    if (teamId) {
      whereClause.teamId = teamId;
    }
    const players = await Player.findAll({
      where: whereClause,
      include: [{ model: Team, as: 'team', attributes: ['id', 'name', 'logoUrl'] }],
      order: [['lastName', 'ASC'], ['firstName', 'ASC']],
    });
    res.json(players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching players' });
  }
};

exports.getPlayerById = async (req, res) => {
  // Implémentez la logique pour récupérer un joueur par son ID
  // N'oubliez pas d'inclure les informations de l'équipe
  res.status(501).json({ message: 'getPlayerById not implemented yet' });
};

// Ajoutez updatePlayer et deletePlayer