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

    const courses = require("../data/courses.json");
    courses.forEach((el) => {
      el.createdAt = el.updatedAt = new Date();
    })

    await queryInterface.bulkInsert("Courses", courses, {
      truncate: true,
      restartIdentity: true,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete("Courses", null);
  }
};
