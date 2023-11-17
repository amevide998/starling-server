import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    email: String,
    hash: String,
    name: String,
    createdAt: Date,
    updatedAt: Date,
    verified : Boolean
})