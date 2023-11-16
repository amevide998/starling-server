import {IsEmail, IsNotEmpty, IsStrongPassword, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateStarlingDto {
    @ApiProperty({
        type: 'string',
        format: 'email',
    })
    @IsNotEmpty()
    email: String

    @ApiProperty({
        type: 'string',
        format: 'password',
    })
    @IsNotEmpty()
    password: String

    @ApiProperty({
        type: 'string'
    })
    @MaxLength(40, {
        message: `name is too long, maximum length is $constraint1`
    })
    @IsNotEmpty()
    starlingName: String

    @ApiProperty({
        type: 'number'
    })
    @IsNotEmpty()
    longitude : number
    @ApiProperty({
        type: 'number'
    })
    @IsNotEmpty()
    latitude : number

    @IsNotEmpty()
    @ApiProperty({
        type: 'string'
    })
    image : string
}