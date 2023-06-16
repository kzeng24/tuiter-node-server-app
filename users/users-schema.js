import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    // helps ensure integrity of info
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
}, {collection: "users"});

export default usersSchema;