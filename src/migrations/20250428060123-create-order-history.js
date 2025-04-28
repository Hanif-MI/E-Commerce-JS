"use strict";

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("order_histories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      // product_list: {
      //   type: Sequelize.JSON,
      //   allowNull: false,
      // },
      // product_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "product",
      //     key: "id",
      //   },
      // },
      status: {
        type: Sequelize.ENUM("pending", "completed", "cancelled", "inprogress"),
        default: "pending",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("order_histories");
  },
};
