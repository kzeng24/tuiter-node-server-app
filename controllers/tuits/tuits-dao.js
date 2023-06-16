import tuitsModel from "./tuits-model.js";

// writing a data access object to provide more specific functions to perform on database
// implements encapsulation and abstraction principles from tuits-model.js
export const findTuits = () => tuitsModel.find();
export const createTuit = (tuit) => tuitsModel.create(tuit);
export const deleteTuit = (tid) => tuitsModel.deleteOne({_id: tid});
export const updateTuit = (tid, tuit) => tuitsModel.updateOne({_id: tid}, {$set: tuit});