import {Schema} from "mongoose";

export interface Starling  {
    readonly userId: Schema.Types.ObjectId,
    readonly starlingName: String,
    readonly longitude: String,
    readonly latitude: String,
    readonly lastUpdate: Date,
    readonly image: String,
    readonly verified: Boolean
}