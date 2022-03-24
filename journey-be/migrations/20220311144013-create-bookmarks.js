"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("bookmarks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idBlogs: {
        type: Sequelize.INTEGER,
        references: {
          model: "blogs",
          key: "id",
        },
      },
      idUSer: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("bookmarks");
  },
};
