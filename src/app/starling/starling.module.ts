import {Module} from "@nestjs/common";
import {starlingProviders} from "./starling.providers";
import {StarlingService} from "./starling.service";
import {StarlingController} from "./starling.controller";
import {DatabaseModule} from "../../database/database.module";
import {otpProviders} from "../otp/otp.providers";

@Module({
    imports: [DatabaseModule],
    controllers : [StarlingController],
    providers : [...starlingProviders, ...otpProviders, StarlingService]
})
export class StarlingModule{}