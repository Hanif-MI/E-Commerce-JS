"use strict";

import dotenv from "dotenv";
dotenv.config();

if (dotenv.error) {
  throw dotenv.error;
}

const config = {
  development: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST_NAME,
    logging: false,
    dialect: "mysql", // 👈 Add this
  },
  staging: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST_NAME,
    dialect: "mysql", // 👈 Add this
  },
  pre_prod: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST_NAME,
    dialect: "mysql", // 👈 Add this
  },
  test: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST_NAME,
    dialect: "mysql", // 👈 Add this
  },
  production: {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST_NAME,
    dialect: "mysql", // 👈 Add this
  },
};

export default config;