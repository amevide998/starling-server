import {
    BadRequestException,
    Body,
    Controller, Get,
    HttpCode,
    HttpException,
    HttpStatus, InternalServerErrorException, MaxFileSizeValidator, Param, ParseFilePipe,
    Post,
    Res, UploadedFile, UseGuards, UseInterceptors,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../../dto/createUser.dto";
import { Response } from 'express';
import { WebResponse } from "../../utils/webResponse";
import { LoginUserDto } from "../../dto/loginUser.dto";
import {AuthGuard} from "./auth.guard";
import {ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {CreateStarlingDto} from "../../dto/createStarling.dto";
import {Express} from "express";
import {FileInterceptor} from "@nestjs/platform-express";
import {FirebaseStorageService} from "../../utils/firebaseStorage";
import {OtpVerifyDto} from "../../dto/otpVerify.dto";

@Controller("auth")
@ApiTags("auth - user")
export class AuthController{

    constructor(private authService: AuthService
    ){};

    @Post("signup")
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({transform: true}))
    @ApiBody({
        description: 'signup user',
        type: CreateUserDto
    })
    async signup(@Body() createUserDto: CreateUserDto, @Res() res: Response ){
        const result = await this.authService.create(createUserDto);
        return res.status(HttpStatus.CREATED)
            .json(new WebResponse(HttpStatus.CREATED, "success, please check your email to verify your account", result, null));

    }

    @Get("verify/:userId/:uniqueString")
    async verify(@Param('userId') userId: string, @Param('uniqueString') uniqueString: string,@Res() res: Response ){
        try{
            await this.authService.verify(userId, uniqueString);
            return res.status(HttpStatus.OK)
                .json(new WebResponse(HttpStatus.OK, "verification success", null, null));
        }catch (err){
            throw new HttpException(err.message, err.status);
        }
    }


    @Post("otpVerify")
    @ApiBody({
        description: 'verify otp',
        type: OtpVerifyDto
    })
    async otpVerify(@Body() otpVerifyDto: OtpVerifyDto ,@Res() res: Response ){
        try{
            await this.authService.otpVerify(otpVerifyDto);
            return res.status(HttpStatus.OK)
                .json(new WebResponse(HttpStatus.OK, "verification success", null, null));
        }catch (err){
            throw new HttpException(err.message, err.status);
        }
    }


    @Post("signin")
    @UsePipes(new ValidationPipe({transform: true}))
    @HttpCode(HttpStatus.OK)
    @ApiBody({
        description: 'user login',
        type: LoginUserDto
    })
    async signin(@Body() request: LoginUserDto, @Res() res: Response){
        const token = await this.authService.signin(request);
        return res.status(HttpStatus.OK)
            .json(new WebResponse(HttpStatus.OK, "success login", token, null))
    }

    @Post("register-starling")
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({transform: true}))
    @ApiBody({
        description: 'user login',
        type: CreateStarlingDto
    })
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(FileInterceptor('image'))
    async registerStarling(@UploadedFile()  image: Express.Multer.File ,@Body() createStarlingUserDto: CreateStarlingDto, @Res() res: Response ){
        // return "belum selesai di kerjain backend nya wkwk"
        const result = await this.authService.registerStarling(createStarlingUserDto, image);

        return res.status(HttpStatus.CREATED)
            .json(new WebResponse(HttpStatus.CREATED, "success, please wait approved from admin", result, null));

    }


}