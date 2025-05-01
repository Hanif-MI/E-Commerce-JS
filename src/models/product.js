import { Model } from "sequelize";

const defineProductModel = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.Cart, {
        foreignKey: "product_id",
        as: "cart",
      });

      Product.hasMany(models.product_media, {
        foreignKey: "productId",
        as: "product_media",
      });
    }
  }

  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "category",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "product",
      modelName: "Product",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
    }
  );

  // Product.associate = (models) => {
  //   Product.belongsTo(models.Category, {
  //     foreignKey: "category_id",
  //     as: "category",
  //   });
  // };

  return Product;
};

export default defineProductModel;
