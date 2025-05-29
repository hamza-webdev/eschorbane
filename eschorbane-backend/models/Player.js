module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jerseyNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    position: {
      type: DataTypes.STRING, // Ex: 'Gardien', 'Défenseur', 'Milieu', 'Attaquant'
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // teamId est ajouté automatiquement par l'association dans models/index.js
    // Ajoutez d'autres champs comme 'heightCm', 'weightKg', 'shortBio_ar', 'shortBio_fr'
    // 'stats_goals', 'stats_assists', 'stats_matches_played'
  }, {
    // Options du modèle
    getterMethods: {
      fullName() {
        return `${this.firstName} ${this.lastName}`;
      }
    }
  });

  return Player;
};