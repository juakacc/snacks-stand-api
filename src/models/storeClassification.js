"use strict";
module.exports = (sequelize, DataTypes) => {
  const StoreClassification = sequelize.define(
    "store_classification",
    {
      classification: DataTypes.FLOAT,
      user_id: DataTypes.INTEGER,
      snack_id: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
    }
  );
  StoreClassification.associate = function (models) {
    StoreClassification.belongsTo(models.user, {
      foreignKey: "user_id",
    });
    StoreClassification.belongsTo(models.snack, {
      foreignKey: "snack_id",
    });
  };
  return StoreClassification;
};
