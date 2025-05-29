require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models'); // Importe l'objet db de models/index.js

// Importation des routes
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const matchRoutes = require('./routes/matchRoutes');
const playerRoutes = require('./routes/playerRoutes');
// Importez d'autres routes ici (teams, etc.)

const app = express();

// Middlewares
app.use(cors()); // Permet les requêtes cross-origin
app.use(express.json()); // Pour parser le JSON dans les corps de requête
app.use(express.urlencoded({ extended: true })); // Pour parser les données de formulaire URL-encoded

// Routes de l'API
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/players', playerRoutes);
// app.use('/api/teams', teamRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API de l\'ESC Cherbane!');
});

// Gestionnaire d'erreurs global (simple)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Quelque chose s\'est mal passé!');
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection to PostgreSQL has been established successfully.');

    // Synchroniser la base de données (crée les tables si elles n'existent pas)
    // En production, utilisez les migrations : await db.sequelize.migrate();
    await db.sequelize.sync({ alter: true }); // Utilise alter:true pour éviter la perte de données pendant le développement
    console.log('Database synchronized.');

    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database or start server:', error);
  }
};

startServer();