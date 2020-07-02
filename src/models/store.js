"use strict";
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define(
    "store",
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      phone: DataTypes.STRING,
      freeDelivery: DataTypes.DOUBLE,
      owner_id: DataTypes.INTEGER,
      address_id: DataTypes.INTEGER,
      available: DataTypes.BOOLEAN,
      latitude: DataTypes.DOUBLE,
      longitude: DataTypes.DOUBLE,
    },
    {
      freezeTableName: true,
    }
  );
  Store.associate = function (models) {
    Store.belongsTo(models.user, {
      foreignKey: "owner_id",
    });
    Store.belongsTo(models.address, {
      foreignKey: "address_id",
    });
    Store.hasMany(models.snack, {
      foreignKey: "store_id",
      as: "Snacks",
    });
  };
  return Store;
};
