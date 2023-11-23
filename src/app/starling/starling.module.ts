import {Module} from "@nestjs/common";
import {starlingProviders} from "./starling.providers";
import {StarlingService} from "./starling.service";
import {StarlingController} from "./starling.controller";
import {DatabaseModule} from "../../database/database.module";
import {otpProviders} from "../otp/otp.providers";
import {FirebaseStorageService} from "../../utils/firebaseStorage";
import {userProviders} from "../user/user.providers";

@Module({
    imports: [DatabaseModule],
    controllers : [StarlingController],
    providers : [...starlingProviders, ...userProviders, StarlingService, FirebaseStorageService]
})
export class StarlingModule{}