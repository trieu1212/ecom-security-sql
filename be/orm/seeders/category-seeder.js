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
      "Category",
      [
        {
          name:"Áo thun nam",
          description:"Áo thun cotton 100%",
        },
        {
          name:"Áo thun nữ",
          description:"Áo thun cotton 100%",
        },
        {
          name:"Quần thun nam",
          description:"Quần thun cotton 100%",
        },
        {
          name:"Quần thun nữ",
          description:"Quần thun cotton 100%",
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
