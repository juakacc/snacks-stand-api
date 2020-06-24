"use strict";
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "order",
    {
      note: DataTypes.STRING,
      status: DataTypes.STRING,
      client_id: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
    }
  );
  Order.associate = function (models) {
    Order.belongsTo(models.user, {
      foreignKey: "client_id",
    });
    Order.belongsTo(models.store, {
      foreignKey: "store_id",
    });
    Order.hasMany(models.order_item, {
      as: "Items",
      foreignKey: "order_id",
    });
  };
  return Order;
};
