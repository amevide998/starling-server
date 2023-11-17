import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import {Model} from "mongoose";
import { User } from "./user.interface";


@Injectable()
export class UserService{
    constructor(
        @Inject('USER_MODEL')
        private userModel: Model<User>

    ) {}

    async get(user: any){
        return {
            email : user.email
        }
    }

}