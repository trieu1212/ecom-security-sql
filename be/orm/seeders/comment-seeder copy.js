'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(
      "Comment",
      [
        {
          userId:1,
          productId:1,
          comment:"Sản phẩm rất tốt"
        },
        {
          userId:2,
          productId:1,
          comment:"Sản phẩm rất tốt, như cc"
        },
        {
          userId:1,
          productId:2,
          comment:"Sản phẩm rất tốt"
        },
        {
          userId:2,
          productId:2,
          comment:"Sản phẩm ok"
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
