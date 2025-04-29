"use strict";

export default {
  async up(queryInterface, Sequelize) {
    queryInterface.addIndex("users", {
      // unique: true,
      fields: ["email"],
      where: {
        deleted_at: null,
      },
      name: "unique_user_email_delete_at_index",
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeIndex("users", "unique_user_email_delete_at_index");
  },
};
