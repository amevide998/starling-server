import {Module} from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { DatabaseModule } from "../../database/database.module";
// import { authProviders } from "./auth.providers";
import { emailVerificationProviders } from "../email-verification/emailVerification.providers";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constant";
import {starlingProviders} from "../starling/starling.providers";
import {FirebaseStorageService} from "../../utils/firebaseStorage";
import {MulterModule} from "@nestjs/platform-express";
import {otpProviders} from "../otp/otp.providers";
import {userProviders} from "../user/user.providers";

@Module({
    imports: [
        DatabaseModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {
                expiresIn: '1 days'
            }
        }),
        MulterModule.register({
        })
    ],
    controllers : [AuthController],
    providers : [AuthService,...otpProviders ,...userProviders, ...emailVerificationProviders]
})
export class AuthModule{}