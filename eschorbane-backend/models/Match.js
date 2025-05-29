module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // homeTeamId et awayTeamId sont ajoutés par les associations
    matchDatetimeUtc: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    stadiumName_ar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stadiumName_fr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    competitionName_ar: { // Simplifié, pourrait être un FK vers une table Competition
      type: DataTypes.STRING,
      allowNull: true,
    },
    competitionName_fr: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    homeScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    awayScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('SCHEDULED', 'LIVE', 'HALF_TIME', 'FULL_TIME', 'POSTPONED', 'CANCELLED'),
      defaultValue: 'SCHEDULED',
    },
    // Ajoutez d'autres champs: refereeName, liveCommentaryText, etc.
  });

  return Match;
};