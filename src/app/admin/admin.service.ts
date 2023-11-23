import {LoginAdminDto} from "../../dto/loginAdmin.dto";
import 'dotenv/config'
import {JwtService} from "@nestjs/jwt";
import {BadRequestException, Injectable} from "@nestjs/common";

@Injectable()
export class AdminService{
    constructor(
        private jwtService: JwtService,
    ) {}
    async login(request: LoginAdminDto){
        if (request.username == "" || request.passcode == "") {
            throw new BadRequestException("username or passcode is empty");
        }

        if(request.username != process.env.ADMIN || request.passcode != process.env.PASSCODE){
            throw new BadRequestException("username or passcode is wrong");
        }
        const payload = {
            user: request.username
        }
        const token = await this.jwtService.signAsync(payload)
        return {
            accessToken: token
        }
    }

}