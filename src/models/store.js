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
  };
  return Store;
};
