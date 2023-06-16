import mongoose from "mongoose";

// create schema through mongoose library to describe structure of tuits

const schema = mongoose.Schema({
    topic: String,
    username: String,
    handle: String,
    time: String,
    image: String,
    title: String,
    replies: Number,
    retuits: Number,
    likes: Number,
    liked: Boolean,
    dislikes: Number,
    tuit: String,
}, {collection: 'tuits'}); // collection name where tuits are stored in tuiter database

export default schema;