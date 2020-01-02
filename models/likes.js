'use strict';
module.exports = (sequelize, DataTypes) => {
  const likes = sequelize.define('likes', {
    eventId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  likes.associate = function (models) {
    // associations can be defined here
    likes.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'usersLikes',
    }),
      likes.belongsTo(models.events, {
        foreignKey: 'eventId',
        as: 'eventsLiked',
      })
  };
  return likes;
};