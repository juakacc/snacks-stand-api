"use strict";
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    "favorite",
    {
      user_id: DataTypes.INTEGER,
      snack_id: DataTypes.INTEGER,
    },
    {}
  );
  Favorite.associate = function (models) {
    Favorite.belongsTo(models.User, {
      foreignKey: "user_id",
    });
    Favorite.belongsTo(models.Snack, {
      foreignKey: "snack_id",
    });
  };
  return Favorite;
};
