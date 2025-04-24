"use strict";

/** @type {import('sequelize-cli').Migration} */

const seedData = [
  { name: "electronics",description : "This is the dummy Description", price : 10.0, category_id : 1, created_at: new Date() },
  { name: "Wood",description : "This is the dummy Description", price : 10.0, category_id : 1, created_at: new Date() },
  { name: "cloth",description : "This is the dummy Description", price : 10.0, category_id : 1, created_at: new Date() },
  { name: "beauty",description : "This is the dummy Description", price : 10.0, category_id : 1, created_at: new Date() },
  { name: "mobile", description : "This is the dummy Description", price : 10.0, category_id : 1,created_at: new Date() },
];

const up = async (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert("category", seedData);
};

const down = async (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete("category", null, {});
};

export { up, down, seedData };
