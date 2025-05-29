module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    logoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // Ajoutez d'autres champs comme 'country', 'city', etc.
    // isOurClub: { type: DataTypes.BOOLEAN, defaultValue: false } // Pour identifier l'ESC
  });

  return Team;
};