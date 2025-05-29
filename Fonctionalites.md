Fonctionnalités Implémentées (Base) :
Authentification : Inscription (/api/auth/register) et connexion (/api/auth/login) avec JWT.
Actualités :
Création d'articles (protégée, nécessite un token JWT) : POST /api/news
Récupération de tous les articles (avec pagination et filtre par catégorie) : GET /api/news
Récupération d'un article par son slug : GET /api/news/:slug
Matchs :
Création de matchs (protégée) : POST /api/matches
Récupération de tous les matchs (avec filtres pour upcoming, past, status) : GET /api/matches
Récupération d'un match par ID : GET /api/matches/:id
Joueurs :
Création de joueurs (protégée) : POST /api/players
Récupération de tous les joueurs (avec filtre par teamId) : GET /api/players
Points à Développer Ensuite :
Modèles et Routes pour les Équipes (Team) : CRUD complet.
Compléter les CRUDs : Ajouter les opérations de mise à jour (UPDATE) et de suppression (DELETE) pour toutes les entités.
Validation des Données : Utiliser une bibliothèque comme Joi ou express-validator pour valider les données entrantes.
Gestion des Rôles plus Fine : Pour les routes protégées, vérifier si l'utilisateur a le rôle approprié (ex: seul un 'admin' ou 'staff' peut créer des actualités).
Gestion des Fichiers (Uploads) : Pour les logos, photos de joueurs, miniatures d'actualités. Des bibliothèques comme multer avec un stockage cloud (S3, Cloudinary) ou local peuvent être utilisées.
Fonctionnalités du Tableau de Bord :
Prochain match : GET /api/matches?upcoming=true&limit=1
Dernier résultat : GET /api/matches?past=true&limit=1
3 dernières actualités : GET /api/news?limit=3
Fonctionnalités plus complexes : Live score, forum, sondages, etc. nécessiteront des modèles et une logique supplémentaires.
Tests : Écrire des tests unitaires et d'intégration.
Documentation API : Utiliser Swagger/OpenAPI pour documenter vos endpoints