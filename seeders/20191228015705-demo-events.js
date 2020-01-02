'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('events', [
      {
        title: "Live Concert Raisa ",
        categoryId: 2,
        startTime: new Date("2019-12-30 17:00"),
        endTime: new Date("2019-12-30 21:00"),
        price: 300000,
        description: "Looking at its layout. the point of using Lorem Ipsum is has a more-or-less normal distribution of letters, making it look like readable English",
        address: "Pamulang Square, Pamulang 2",
        urlMaps: "link",
        img: "https://s3-ap-southeast-1.amazonaws.com/loket-production-sg/images/banner/20191202125057.JPG",
        createdBy: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Mobile Legend Professional League",
        categoryId: 4,
        startTime: new Date("2019-12-31 11:00"),
        endTime: new Date("2019-12-31 18:00"),
        price: 50000,
        description: "Looking at its layout. the point of using Lorem Ipsum is has a more-or-less normal distribution of letters, making it look like readable English",
        address: "Mall Taman Anggrek",
        urlMaps: "link",
        img: "https://mobilelegends.gcube.id/wp-content/uploads/sites/6/2018/01/mobile-legends-professional-league-banner.jpg",
        createdBy: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Lomba Menghapal Tabel Periodik",
        categoryId: 3,
        startTime: new Date("2019-12-30 09:00"),
        endTime: new Date("2019-12-30 15:00"),
        price: 25000,
        description: "Looking at its layout. the point of using Lorem Ipsum is has a more-or-less normal distribution of letters, making it look like readable English",
        address: "Universitas Pamulang",
        urlMaps: "link",
        img: "https://i1.wp.com/www.radarbanten.co.id/wp-content/uploads/2019/01/Loogo-copy.png?fit=3508%2C2480&ssl=1",
        createdBy: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Shopee Liga ",
        categoryId: 1,
        startTime: new Date("2019-12-31 08:00"),
        endTime: new Date("2019-12-31 18:00"),
        price: 100000,
        description: "Looking at its layout. the point of using Lorem Ipsum is has a more-or-less normal distribution of letters, making it look like readable English",
        address: "Lapangan Lebak Bulus",
        urlMaps: "link",
        img: "https://d10dnch8g6iuzs.cloudfront.net/picture/2412019062214463447/width/480/height/306",
        createdBy: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('events', null, {})
  }
};
