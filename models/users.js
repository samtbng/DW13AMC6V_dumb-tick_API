'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    birthday:DataTypes.DATE,
    password: DataTypes.STRING,
    fullname: DataTypes.STRING,
    phone: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, {});
  users.associate = function (models) {
    // associations can be defined here
    users.hasMany(models.events, { foreignKey: "createdBy" })
    users.hasMany(models.orders, { foreignKey: "buyersId" })
    users.hasMany(models.likes, { as: 'likes', foreignKey: "userId" })
  };
  return users;
};