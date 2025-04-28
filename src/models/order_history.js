"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class order_history extends Model {
    static associate(models) {
      order_history.hasMany(models.order_items,{
        foreignKey : "order_id",
        as : "order"
      })
    }
  }
  order_history.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: false,
      },
      // product_list: { type: DataTypes.JSON, allowNull: false },
      // product_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: "product",
      //     key: "id",
      //   },
      // },
      status: {
        type: DataTypes.ENUM("pending", "completed", "cancelled", "inprogress"),
        defaultValue: "pending",
      },
    },
    {
      sequelize,
      modelName: "order_history",
      tableName: "order_histories",
      paranoid: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      underscored: true,
    }
  );
  return order_history;
};
