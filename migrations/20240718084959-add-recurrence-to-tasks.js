"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Tasks", "recurrence", {
      type: Sequelize.ENUM("none", "daily", "weekly", "monthly"),
      defaultValue: "none",
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Tasks", "recurrence");
  },
};
