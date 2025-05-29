//Ce fichier initialise Sequelize et charge tous les modèles. Il gère également les associations entre les modèles.
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importation des modèles
db.User = require('./User')(sequelize, Sequelize.DataTypes);
db.Team = require('./Team')(sequelize, Sequelize.DataTypes);
db.Player = require('./Player')(sequelize, Sequelize.DataTypes);
db.NewsArticle = require('./NewsArticle')(sequelize, Sequelize.DataTypes);
db.Match = require('./Match')(sequelize, Sequelize.DataTypes);

// Définition des associations

// Un joueur appartient à une équipe
db.Team.hasMany(db.Player, { foreignKey: 'teamId', as: 'players' });
db.Player.belongsTo(db.Team, { foreignKey: 'teamId', as: 'team' });

// Un article de news est écrit par un utilisateur (simplifié, pourrait être un admin/staff)
db.User.hasMany(db.NewsArticle, { foreignKey: 'authorId', as: 'newsArticles' });
db.NewsArticle.belongsTo(db.User, { foreignKey: 'authorId', as: 'author' });

// Un match a une équipe à domicile et une équipe à l'extérieur
db.Match.belongsTo(db.Team, { as: 'homeTeam', foreignKey: 'homeTeamId' });
db.Match.belongsTo(db.Team, { as: 'awayTeam', foreignKey: 'awayTeamId' });
db.Team.hasMany(db.Match, { foreignKey: 'homeTeamId', as: 'homeMatches' });
db.Team.hasMany(db.Match, { foreignKey: 'awayTeamId', as: 'awayMatches' });

// D'autres associations peuvent être ajoutées ici (ex: MatchLineups, MatchEvents, etc.)


// Synchronisation des modèles avec la base de données
// ATTENTION: { force: true } supprime et recrée les tables. Utilisez avec prudence en développement.
// En production, préférez les migrations Sequelize.
const syncDb = async () => {
  try {
    // await sequelize.sync({ force: true }); // Pour le développement initial
    await sequelize.sync({ alter: true }); // Pour appliquer les modifications sans supprimer les données (prudent)
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
};

// syncDb(); // Décommentez pour synchroniser au démarrage, ou utilisez les migrations CLI

module.exports = db;