import { IsEmail, IsStrongPassword, MaxLength } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @IsEmail(undefined, {
        message: "Make sure to use a valid email address."
    })
    @ApiProperty({
        type: 'string',
        format: 'email',
    })
    email: String

    @MaxLength(40, {
        message: `password is too long, maximum length is $constraint1`
    })
    @IsStrongPassword(undefined, {
        message: "Password must be at least 8 characters long and include one uppercase letter, one number, and one special character."
    })
    @ApiProperty({
        type: 'string',
        format: 'password',
    })
    password: String
}