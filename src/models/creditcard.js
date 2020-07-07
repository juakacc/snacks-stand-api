"use strict";
module.exports = (sequelize, DataTypes) => {
  const CreditCard = sequelize.define(
    "credit_card",
    {
      number: DataTypes.STRING,
      nameOwner: DataTypes.STRING,
      validateDate: DataTypes.DATE,
      securityCode: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
    }
  );
  CreditCard.associate = function (models) {
    CreditCard.belongsTo(models.user, {
      foreignKey: "user_id",
    });
  };
  return CreditCard;
};
