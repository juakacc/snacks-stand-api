"use strict";
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define(
    "favorite",
    {
      user_id: DataTypes.INTEGER,
      snack_id: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
    }
  );
  Favorite.associate = function (models) {
    Favorite.belongsTo(models.user, {
      foreignKey: "user_id",
    });
    Favorite.belongsTo(models.snack, {
      foreignKey: "snack_id",
    });
  };
  return Favorite;
};
