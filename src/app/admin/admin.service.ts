import {LoginAdminDto} from "../../dto/loginAdmin.dto";
import 'dotenv/config'
import {JwtService} from "@nestjs/jwt";
import {BadRequestException, Inject, Injectable} from "@nestjs/common";
import {Starling} from "../starling/starling.interface";
import {Model} from "mongoose";

@Injectable()
export class AdminService{
    constructor(
        @Inject('STARLING_MODEL')
        private starlingModel: Model<Starling>,

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

    async getAll(){
        return this.starlingModel.find();
    }

}