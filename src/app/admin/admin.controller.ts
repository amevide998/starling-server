import {Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards, UsePipes, ValidationPipe} from "@nestjs/common";
import {ApiBody, ApiTags} from "@nestjs/swagger";
import {LoginAdminDto} from "../../dto/loginAdmin.dto";
import { Response } from 'express';
import {WebResponse} from "../../utils/webResponse";
import {AdminService} from "./admin.service";
import {AdminGuard} from "./admin.guard";


@Controller("admin")
@ApiTags("admin")
export class AdminController{

    constructor(private adminService: AdminService
    ){};

    @Post("signin")
    @UsePipes(new ValidationPipe({transform: true}))
    @HttpCode(HttpStatus.OK)
    @ApiBody({
        description: 'admin login',
        type: LoginAdminDto
    })
    async signin(@Body() request: LoginAdminDto, @Res() res: Response){
        const token = await this.adminService.login(request);
        return res.status(HttpStatus.OK)
            .json(new WebResponse(HttpStatus.OK, "success login", token, null))
    }

    @Post("list")
    @UsePipes(new ValidationPipe({transform: true}))
    @HttpCode(HttpStatus.OK)
    @ApiBody({
        description: 'starling list',
        type: LoginAdminDto
    })
    @UseGuards(AdminGuard)
    async List(@Res() res: Response , @Req() request: any){
        const result = await this.adminService.getAll();
        return res.status(HttpStatus.OK)
            .json(new WebResponse(HttpStatus.OK, "success", result, null));
    }



}