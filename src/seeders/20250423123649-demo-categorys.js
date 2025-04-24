"use strict";

/** @type {import('sequelize-cli').Migration} */

const seedData = [
  { name: "electronics", created_at: new Date() },
  { name: "Wood", created_at: new Date() },
  { name: "cloth", created_at: new Date() },
  { name: "beauty", created_at: new Date() },
  { name: "mobile", created_at: new Date() },
];

const up = async (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert("category", seedData);
};

const down = async (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete("category", null, {});
};

export { up, down, seedData };
