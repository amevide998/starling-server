
import {DatabaseModule} from "../../database/database.module";
import {otpProviders} from "../otp/otp.providers";
import {Module} from "@nestjs/common";
import {userProviders} from "./user.providers";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";

@Module({
    imports: [DatabaseModule],
    controllers : [UserController],
    providers : [...userProviders, UserService]
})
export class UserModule{}