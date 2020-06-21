"use strict";
module.exports = (sequelize, DataTypes) => {
  const SnackComment = sequelize.define(
    "snack_comment",
    {
      comment: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
      snack_id: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
    }
  );
  SnackComment.associate = function (models) {
    Favorite.belongsTo(models.user, {
      foreignKey: "user_id",
    });
    Favorite.belongsTo(models.snack, {
      foreignKey: "snack_id",
    });
  };
  return SnackComment;
};
