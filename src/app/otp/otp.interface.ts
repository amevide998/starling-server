import {Schema} from "mongoose";

export interface Otp  {
    readonly email: String
    readonly otp: String
}