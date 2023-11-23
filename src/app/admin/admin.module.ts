import {jwtConstants} from "../auth/constant";
import {JwtModule} from "@nestjs/jwt";
import {DatabaseModule} from "../../database/database.module";
import {Module} from "@nestjs/common";
import {AdminService} from "./admin.service";
import {AdminController} from "./admin.controller";
import {starlingProviders} from "../starling/starling.providers";

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
    ],
    controllers : [AdminController],
    providers : [AdminService, ...starlingProviders]
})
export class AdminModule{}