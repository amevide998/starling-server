import {IsEmail, IsNotEmpty, IsStrongPassword, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class OtpVerifyDto {
    @IsEmail(undefined, {
        message: "Make sure to use a valid email address."
    })
    @ApiProperty({
        type: 'string',
        format: 'email',
    })
    email: String

    @IsNotEmpty()
    @ApiProperty({
        type: 'string'
    })
    otp: string
}