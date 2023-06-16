import mongoose from "mongoose";
import tuitsSchema from "./tuits-schema.js";

// Mongoose models provide functions to interact with MongoDB programmatically instead of manually
// Basic built in functions (find, create, update, remove) that will be called in tuits-dao.js
const tuitsModel = mongoose.model("TuitModel", tuitsSchema);

export default tuitsModel;