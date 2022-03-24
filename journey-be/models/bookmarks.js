"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bookmarks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bookmarks.belongsTo(models.blogs, {
        as: "blogs",
        foreignKey: {
          name: "idBlogs",
        },
      });
      bookmarks.belongsTo(models.User, {
        as: "User",
        foreignKey: {
          name: "idUSer",
        },
      });
    }
  }
  bookmarks.init(
    {
      idBlogs: DataTypes.INTEGER,
      idUSer: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "bookmarks",
    }
  );
  return bookmarks;
};
