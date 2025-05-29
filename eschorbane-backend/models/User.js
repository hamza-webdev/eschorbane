const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('supporter', 'player', 'staff', 'admin'),
      defaultValue: 'supporter',
    },
    languagePreference: {
      type: DataTypes.ENUM('ar', 'fr'),
      defaultValue: 'ar',
    },
    // Ajoutez d'autres champs comme firstName, lastName, profilePictureUrl, etc.
  });

  // Hook pour hacher le mot de passe avant de sauvegarder
  User.beforeCreate(async (user) => {
    if (user.passwordHash) { // Assurez-vous que le mot de passe est fourni
      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(user.passwordHash, salt);
    }
  });

  User.prototype.isValidPassword = async function (password) {
    return bcrypt.compare(password, this.passwordHash);
  };

  return User;
};