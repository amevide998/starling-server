import {
    Body,
    Controller, Get, HttpCode, HttpStatus, Post, Put, Req,
    Res, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe
} from "@nestjs/common";
import {Response, Request, Express} from 'express';

import {AuthGuard} from "../auth/auth.guard";
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {CreateStarlingDto} from "../../dto/createStarling.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {WebResponse} from "../../utils/webResponse";
import {StarlingService} from "./starling.service";
import {UpdateStarlingDto} from "../../dto/updateStarling.dto";

@Controller("starling")
@ApiTags("starling")

export class StarlingController{

    constructor(
        private starlingService : StarlingService
    ){};

    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get()
    async get(@Res() res: Response , @Req() request: any){
        console.log("cek user", request.user)
        return "hello"
    }

    @Post("register")
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe({transform: true}))
    @ApiBody({
        description: 'register starling',
        type: CreateStarlingDto
    })
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(FileInterceptor('image'))
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async registerStarling(@Req() req, @UploadedFile()  image: Express.Multer.File ,@Body() createStarlingUserDto: CreateStarlingDto, @Res() res: Response ){
        const user = {email: req.user.email}
        const result = await this.starlingService.registerStarling(createStarlingUserDto, image, user);

        return res.status(HttpStatus.CREATED)
            .json(new WebResponse(HttpStatus.CREATED, "success, please wait approved from admin", result, null));

    }

    @Put("update")
    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe({transform: true}))
    @ApiBody({
        description: 'update starling dto',
        type: UpdateStarlingDto
    })
    @ApiConsumes("multipart/form-data")
    @UseInterceptors(FileInterceptor('image'))
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    async updateStarling(@Req() req, @UploadedFile()  image: Express.Multer.File ,@Body() updateStarlingUserDto: UpdateStarlingDto, @Res() res: Response ){
        const user = {email: req.user.email}
        const result = await this.starlingService.updateStarling(updateStarlingUserDto, image, user);

        return res.status(HttpStatus.OK)
            .json(new WebResponse(HttpStatus.OK, "success, please wait approved from admin", result, null));

    }


}