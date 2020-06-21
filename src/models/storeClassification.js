"use strict";
module.exports = (sequelize, DataTypes) => {
  const StoreClassification = sequelize.define(
    "store_classification",
    {
      classification: DataTypes.FLOAT,
      user_id: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
    }
  );
  StoreClassification.associate = function (models) {
    StoreClassification.belongsTo(models.user, {
      foreignKey: "user_id",
    });
    StoreClassification.belongsTo(models.store, {
      foreignKey: "store_id",
    });
  };
  return StoreClassification;
};
