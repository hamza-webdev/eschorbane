module.exports = (sequelize, DataTypes) => {
  const NewsArticle = sequelize.define('NewsArticle', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title_ar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title_fr: {
      type: DataTypes.STRING,
      allowNull: true, // Ou false si le français est toujours requis
    },
    content_ar: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content_fr: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    slug: { // Pour des URLs conviviales
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    publicationDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    category: {
      type: DataTypes.ENUM('Équipe Première', 'Jeunes', 'Mercato', 'Événements', 'Club'),
      allowNull: true,
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    videoUrl: { // Lien YouTube/Vimeo ou autre
      type: DataTypes.STRING,
      allowNull: true,
    },
    // authorId est ajouté par l'association
  });

  return NewsArticle;
};