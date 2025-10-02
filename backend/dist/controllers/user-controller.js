"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserByName = exports.getUserByName = exports.upsertUserByName = void 0;
const user_model_1 = require("../models/user-model");
const upsertUserByName = async (name, payload) => {
    const result = await user_model_1.UserModel.findOneAndUpdate({ name }, { $set: payload }, { upsert: true, new: true, runValidators: true }).exec();
    return result;
};
exports.upsertUserByName = upsertUserByName;
const getUserByName = async (name) => {
    return user_model_1.UserModel.findOne({ name }).lean().exec();
};
exports.getUserByName = getUserByName;
const deleteUserByName = async (name) => {
    return user_model_1.UserModel.deleteOne({ name }).exec();
};
exports.deleteUserByName = deleteUserByName;
