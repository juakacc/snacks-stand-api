"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      lastAccess: DataTypes.DATE,
      autoPayment: DataTypes.BOOLEAN,
      address_id: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
    }
  );
  User.associate = function (models) {
    User.belongsTo(models.address, {
      foreignKey: "address_id",
    });
  };
  return User;
};
