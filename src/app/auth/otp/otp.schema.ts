import * as mongoose from "mongoose";

export const OtpSchema = new mongoose.Schema({
    email: String,
    otp: String
})