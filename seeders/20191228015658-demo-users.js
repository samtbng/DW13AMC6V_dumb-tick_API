'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    function generateUUID() { // Public Domain/MIT
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
  }

    return queryInterface.bulkInsert('users', [
      {
        id:generateUUID(),
        username: "samtbng",
        password: "12345678",
        fullname: "Samuel Tobing",
        email: "samuel@gmail.com",
        birthday:"1996-05-31",
        avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/220px-Patrick_Star.svg.png",
        phone: "087878677084",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:generateUUID(),
        username: "faisal",
        password: "12345678",
        fullname: "Faisal adhi",
        email: "faisal@gmail.com",
        birthday:"2000-09-22",
        avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png",
        phone: "08763927482",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:generateUUID(),
        username: "chandra",
        password: "12345678",
        fullname: "Chandra Antonious",
        email: "chandra@gmail.com",
        birthday:"1995-01-31",
        avatar: "https://www.pikpng.com/pngl/m/72-727346_spongebob-characters-hd-png-download.png",
        phone: "08123957294",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:generateUUID(),
        username: "randi",
        password: "12345678",
        fullname: "Muhammad Randi",
        email: "randi@gmail.com",
        birthday:"1995-07-07",
        avatar: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/Sandy_Cheeks.svg/220px-Sandy_Cheeks.svg.png",
        phone: "085782847389",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
};
