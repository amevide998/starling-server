import {
    Controller, Get, HttpStatus, Req,
    Res, UseGuards
} from "@nestjs/common";
import { Response, Request } from 'express';

import {AuthGuard} from "../auth/auth.guard";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {UserService} from "./user.service";
import {WebResponse} from "../../utils/webResponse";

@Controller("user")
@ApiTags("user")
@ApiBearerAuth()
export class UserController{

    constructor(
        private userService: UserService
    ){};

    @UseGuards(AuthGuard)
    @Get()
    async get(@Res() res: Response , @Req() request: any){
        console.log("cek user", request.user)
        const user = await this.userService.get(request.user)
        return res.status(HttpStatus.CREATED)
            .json(new WebResponse(HttpStatus.CREATED, "success", user, null));

    }

}