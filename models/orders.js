'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    eventId: DataTypes.INTEGER,
    buyersId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: DataTypes.STRING,
    attachment: DataTypes.STRING
  }, {});
  orders.associate = function (models) {
    // associations can be defined here
    orders.belongsTo(models.events, {
      foreignKey: 'eventId',
      as: 'event',
    }),
      orders.belongsTo(models.users, {
        foreignKey: 'buyersId',
        as: 'buyer',
      })
  };
  return orders;
};