// NEW: fetch data from the database and perform actions
import usersModel from "./users-model.js";

export const findAllUsers = () => usersModel.findAll();

export const findUserById = (uid) => {
    return usersModel.findById(uid);
}

export const findUserByUsername = (username) => {
    return usersModel.findOne({username});
}

export const findUserByCredentials = (username, password) => {
    return usersModel.findOne({username, password});
}

export const createUser = (user) => {
    return usersModel.create(user);
}

export const updateUser = (uid, user) => {
    return usersModel.updateOne({ _id: uid }, { $set: user });
}

export const deleteUser = (uid) => {
    usersModel.deleteOne({_id: uid});
    return {status: "ok"};
}