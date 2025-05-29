eschorbane-backend/
├── config/
│   └── database.js       # Configuration de la connexion Sequelize à PostgreSQL
├── controllers/
│   ├── authController.js   # Logique pour l'authentification (inscription, connexion)
│   ├── newsController.js   # Logique pour la gestion des actualités
│   ├── matchController.js  # Logique pour la gestion des matchs
│   └── playerController.js # Logique pour la gestion des joueurs
├── middlewares/
│   └── authMiddleware.js # Middleware pour protéger les routes
├── models/
│   ├── index.js          # Point d'entrée pour Sequelize et l'initialisation des modèles
│   ├── User.js           # Modèle Sequelize pour les Utilisateurs
│   ├── NewsArticle.js    # Modèle Sequelize pour les Actualités
│   ├── Team.js           # Modèle Sequelize pour les Équipes
│   ├── Player.js         # Modèle Sequelize pour les Joueurs
│   └── Match.js          # Modèle Sequelize pour les Matchs
├── routes/
│   ├── authRoutes.js     # Routes pour l'authentification
│   ├── newsRoutes.js     # Routes pour les actualités
│   ├── matchRoutes.js    # Routes pour les matchs
│   └── playerRoutes.js   # Routes pour les joueurs
├── .env.example            # Fichier d'exemple pour les variables d'environnement
├── .gitignore              # Fichiers et dossiers à ignorer par Git
├── package.json            # Dépendances et scripts du projet
└── server.js               # Fichier principal pour démarrer le serveur Express
