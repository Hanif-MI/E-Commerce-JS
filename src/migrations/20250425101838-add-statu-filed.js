"use strict";

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("cart", "status", {
      type: Sequelize.ENUM("pending", "completed", "cancelled", "inprogress"),
      defaultValue: "pending",
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("cart", "status");
  },
};
