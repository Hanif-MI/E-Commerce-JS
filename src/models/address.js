"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      // Define the association with the User model
      Address.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Address.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      full_address: {
        type: DataTypes.STRING,
      },
      is_primary: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      user_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Address",
      tableName: "address",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
      underscored: true,
    }
  );
  return Address;
};
