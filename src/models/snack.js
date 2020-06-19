"use strict";
module.exports = (sequelize, DataTypes) => {
  const Snack = sequelize.define(
    "snack",
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DOUBLE,
      new: DataTypes.BOOLEAN,
      store_id: DataTypes.INTEGER,
    },
    {}
  );
  Snack.associate = function (models) {
    Snack.belongsTo(models.Store, {
      foreignKey: "store_id",
    });
  };
  return Snack;
};
