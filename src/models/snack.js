'use strict';
module.exports = (sequelize, DataTypes) => {
  const Snack = sequelize.define('Snack', {
    name: DataTypes.STRING
  }, {});
  Snack.associate = function(models) {
    // associations can be defined here
  };
  return Snack;
};