"use strict";
module.exports = (sequelize, DataTypes) => {
  const Snack = sequelize.define(
    "snack",
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DOUBLE,
      new: DataTypes.BOOLEAN,
      sales: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
    }
  );
  Snack.associate = function (models) {
    Snack.belongsTo(models.store, {
      foreignKey: "store_id",
    });
  };
  return Snack;
};
