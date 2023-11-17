import * as mongoose from "mongoose";
import {Schema} from "mongoose";

export const StarlingSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    starlingName: String,
    longitude: String,
    latitude: String,
    lastUpdate: {
        type: Date,
        default: Date.now()
    },
    image : String,
    verified: {
        type : Boolean,
        default: false
    }
})