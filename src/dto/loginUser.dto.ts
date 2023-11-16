import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail(undefined, {
        message: "Make sure to use a valid email address."
    })
    @ApiProperty({
        type: 'string',
        format: 'email',

    })
    email: String

    @IsNotEmpty()
    @MaxLength(40, {
        message: `password is too long, maximum length is $constraint1`
    })
    @ApiProperty({
        type: 'string',
        format: 'password',
    })
    password: String
}