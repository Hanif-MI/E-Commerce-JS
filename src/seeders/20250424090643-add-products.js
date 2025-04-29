"use strict";

/** @type {import('sequelize-cli').Migration} */

const seedData = [
  {
    name: "electronics",
    description: "This is the dummy Description",
    price: 10.0,
    category_id: 16,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "Wood",
    description: "This is the dummy Description",
    price: 10.0,
    category_id: 17,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "cloth",
    description: "This is the dummy Description",
    price: 10.0,
    category_id: 18,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "beauty",
    description: "This is the dummy Description",
    price: 10.0,
    category_id: 19,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    name: "mobile",
    description: "This is the dummy Description",
    price: 10.0,
    category_id: 20,
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const up = async (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert("product", seedData);
};

const down = async (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete("product", null, {});
};

export { up, down, seedData };
