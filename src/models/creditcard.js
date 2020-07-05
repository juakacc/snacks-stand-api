"use strict";
module.exports = (sequelize, DataTypes) => {
  const CreditCard = sequelize.define(
    "credit_card",
    {
      name: DataTypes.STRING,
    },
    {}
  );
  CreditCard.associate = function (models) {
    // associations can be defined here
  };
  return CreditCard;
};
