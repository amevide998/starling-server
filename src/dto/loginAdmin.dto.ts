import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginAdminDto {
    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
    })
    username: String

    @IsNotEmpty()
    @ApiProperty({
        type: 'string',
        format: 'password',
    })
    passcode: String
}