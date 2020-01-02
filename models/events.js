'use strict';
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define('events', {
    title: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    price: DataTypes.INTEGER,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    urlMaps: DataTypes.STRING,
    img: DataTypes.STRING,
    createdBy: DataTypes.INTEGER
  }, {});
  events.associate = function (models) {
    // associations can be defined here
    events.belongsTo(models.categories, {
      foreignKey: 'categoryId',
      as: 'category',
    }),
      events.belongsTo(models.users, {
        foreignKey: 'createdBy',
        as: 'CreatedBy',
      }),
      events.hasMany(models.orders, { foreignKey: 'eventId' })
    events.hasMany(models.likes, { foreignKey: "eventId" })
  };
  return events;
};