import { UserModel } from "../models/user.model.js";

export const userRepo = {
  create: (doc) => UserModel.create(doc),
  findByEmail: (email) => UserModel.findOne({ email: email.toLowerCase() }),
  findById: (id) => UserModel.findById(id),
};
