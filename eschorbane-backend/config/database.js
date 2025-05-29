//Configuration de la connexion à la base de données PostgreSQL avec Sequelize.
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, // Mettez à true pour voir les requêtes SQL dans la console
    dialectOptions: {
      // Options spécifiques à PostgreSQL si nécessaire (ex: SSL)
      // ssl: { require: true, rejectUnauthorized: false } // Exemple pour Heroku
    }
  }
);

module.exports = sequelize;