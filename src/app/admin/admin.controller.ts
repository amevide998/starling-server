import {Body, Controller, HttpCode, HttpStatus, Post, Res, UsePipes, ValidationPipe} from "@nestjs/common";
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {LoginAdminDto} from "../../dto/loginAdmin.dto";
import { Response } from 'express';
import {WebResponse} from "../../utils/webResponse";
import {AdminService} from "./admin.service";


@Controller("admin")
@ApiTags("admin")
export class AdminController{

    constructor(private adminService: AdminService
    ){};

    @Post("signin")
    @UsePipes(new ValidationPipe({transform: true}))
    @HttpCode(HttpStatus.OK)
    @ApiBody({
        description: 'user login',
        type: LoginAdminDto
    })
    async signin(@Body() request: LoginAdminDto, @Res() res: Response){
        const token = await this.adminService.login(request);
        return res.status(HttpStatus.OK)
            .json(new WebResponse(HttpStatus.OK, "success login", token, null))
    }



}