"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("store_classification", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      classification: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "user",
          key: "id",
        },
      },
      snack_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "snack",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("store_classification");
  },
};