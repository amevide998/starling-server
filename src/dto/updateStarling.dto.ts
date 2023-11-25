import {IsEmail, IsNotEmpty, IsStrongPassword, MaxLength} from "class-validator";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class UpdateStarlingDto {

    @ApiProperty({
        type: 'string'
    })
    @MaxLength(40, {
        message: `name is too long, maximum length is $constraint1`
    })
    @IsNotEmpty()
    starlingName: String

    @ApiPropertyOptional({
        type: 'number'
    })
    longitude : number
    @ApiPropertyOptional({
        type: 'number'
    })
    latitude : number

    @ApiPropertyOptional({
        type: 'string'
    })
    image_url? : string


    @ApiPropertyOptional({ type: 'string', format: 'binary' })
    image?: any;
}