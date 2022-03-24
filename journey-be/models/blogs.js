"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      blogs.belongsTo(models.User, {
        as: "User",
        foreignKey: "idUser",
      });
      blogs.hasMany(models.bookmarks, {
        as: "bookmarks",
        foreignKey: "idBlogs",
      });
    }
  }
  blogs.init(
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.TEXT,
      idUser: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "blogs",
    }
  );
  return blogs;
};
