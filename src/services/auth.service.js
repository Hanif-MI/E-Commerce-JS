import { where } from "sequelize";
import Models from "../models/index.js";

export const checkIfUserExists = async (email) => {
  const UserModel = Models.User;
  return await UserModel.findOne({ where: { email } });
};

export const createUser = async (userData) => {
  const UserModel = Models.User;
  return await UserModel.create(userData);
};

export const findByPk = async (userId) => {
  const UserModel = Models.User;
  return await UserModel.findOne({ where: { id: userId } });
};
