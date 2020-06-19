"use strict";
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define(
    "store",
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      phone: DataTypes.STRING,
      free_delivery: DataTypes.DOUBLE,
      owner_id: DataTypes.INTEGER,
      address_id: DataTypes.INTEGER,
      available: DataTypes.BOOLEAN,
    },
    {}
  );
  Store.associate = function (models) {
    Store.belongsTo(models.User, {
      foreignKey: "owner_id",
    });
    Store.belongsTo(models.Address, {
      foreignKey: "address_id",
    });
  };
  return Store;
};
