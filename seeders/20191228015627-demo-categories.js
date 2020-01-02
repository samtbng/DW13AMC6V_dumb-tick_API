'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categories', [
      {
        name: "Sports",
        createdAt: new Date(),
        updatedAt: new Date(),
        image: "https://www.thecompleteuniversityguide.co.uk/media/4928283/istock-949190756.jpg"
      },
      {
        name: "Musics",
        createdAt: new Date(),
        updatedAt: new Date(),
        image: "https://jooinn.com/images/colorful-music-background-shows-sounds-jazz-and-harmony.jpg"
      },
      {
        name: "Sciences",
        createdAt: new Date(),
        updatedAt: new Date(),
        image: "https://previews.123rf.com/images/teploleta/teploleta1506/teploleta150600396/41698776-hand-drawn-chemistry-seamless-paattern-science-background-.jpg"

      },
      {
        name: "Gamings",
        createdAt: new Date(),
        updatedAt: new Date(),
        image: "https://mmc.tirto.id/image/otf/500x0/2019/01/29/playing-games-istockphoto-1_ratio-16x9.jpg"
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categories', null, {})
  }
};
