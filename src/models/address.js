"use strict";
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "address",
    {
      street: DataTypes.STRING,
      number: DataTypes.INTEGER,
      complement: DataTypes.STRING,
      district: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
    },
    {}
  );
  Address.associate = function (models) {};
  return Address;
};
