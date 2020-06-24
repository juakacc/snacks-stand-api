"use strict";
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "order_item",
    {
      amount: DataTypes.INTEGER,
      value: DataTypes.DOUBLE,
      snack_id: DataTypes.INTEGER,
      order_id: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
    }
  );
  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.snack, {
      foreignKey: "snack_id",
    });
    OrderItem.belongsTo(models.order, {
      foreignKey: "order_id",
    });
  };
  return OrderItem;
};
