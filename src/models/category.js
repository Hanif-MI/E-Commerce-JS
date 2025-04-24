import { Model } from "sequelize";

const defineCategoryModel = (sequelize, DataTypes) => {
  class Category extends Model {
    static associations(models) {
      // models.Category.hasOne(models.Product, {
      //   foreignKey: {
      //     name: "id",
      //     type: DataTypes.INTEGER,
      //   },
      // });
    }
  }

  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "category",
      underscored: true,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
    }
  );
  return Category;
};

export default defineCategoryModel;
