"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class product_media extends Model {
    static associate(models) {
      this.belongsTo(models.Product);
    }
  }
  product_media.init(
    {
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fileSize: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: "product",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "product_media",
      tableName: "product_media",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      timestamps: true,
      // underscored: true,
      paranoid: true,
    }
  );
  return product_media;
};
