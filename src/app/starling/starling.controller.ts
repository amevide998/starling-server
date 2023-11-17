import {
    Controller, Get, Req,
    Res, UseGuards
} from "@nestjs/common";
import { Response, Request } from 'express';

import {AuthGuard} from "../auth/auth.guard";
import {ApiBearerAuth, ApiTags} from "@nestjs/swagger";

@Controller("starling")
@ApiTags("api tags for starling")
@ApiBearerAuth()
export class StarlingController{

    constructor(    ){};

    @UseGuards(AuthGuard)
    @Get()
    async get(@Res() res: Response , @Req() request: any){
        console.log("cek user", request.user)
        return "hello"
    }

}