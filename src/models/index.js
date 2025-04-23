"use strict";

import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import process from "process";
import { fileURLToPath } from "url";
import configFile from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configFile[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Load all model files
const loadModels = async () => {
  const modelFiles = fs
    .readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".js" &&
        file.indexOf(".test.js") === -1
      );
    });

  for (const file of modelFiles) {
    const { default: modelInit } = await import(path.join(__dirname, file));
    const model = modelInit(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }

  // Set up associations
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
};

// Initialize database
const initializeDatabase = async () => {
  try {
    // Authenticate connection
    await sequelize.authenticate();
    console.log("Database connection established successfully");

    // Load models
    await loadModels();

    await sequelize.sync();
    console.log("Database synchronized successfully");

    // Optional: Check if tables exist
    const tables = await sequelize.getQueryInterface().showAllTables();
    console.log("Existing tables:", tables);

  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Execute initialization
initializeDatabase()
  .then(() => {
    console.log("Database & tables setup completed!");
  })
  .catch((error) => {
    console.error("Error during database setup:", error);
  });

export default db;