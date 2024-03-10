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
      "User",
      [
        {
          email: "trieudz1@gmail.com",
          password:"1",
          username:"trieu1"
        },
        {
          email: "trieudz2@gmail.com",
          password:"2",
          username:"trieu2"
        },
        {
          email: "trieudz3@gmail.com",
          password:"3",
          username:"trieu3"
        },
        {
          email: "trieudz4@gmail.com",
          password:"4",
          username:"trieu4"
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
