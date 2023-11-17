import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import {Model, Schema} from "mongoose";
import { User } from "../user/user.interface";
import { CreateUserDto } from "../../dto/createUser.dto";
import * as bcrypt from 'bcrypt';
import { CreateUserResponseDto } from "../../dto/createUserResponse.dto";
import sendMail from "../email-verification/sendmail";
import { EmailVerification } from "../email-verification/emailVerification.interface";
import { v4 } from "uuid";
import { LoginUserDto } from "../../dto/loginUser.dto";
import { JwtService } from "@nestjs/jwt";
import {CreateStarlingDto} from "../../dto/createStarling.dto";
import {Starling} from "../starling/starling.interface";
import {FirebaseStorageService} from "../../utils/firebaseStorage";
import {OtpVerifyDto} from "../../dto/otpVerify.dto";
import {Otp} from "../otp/otp.interface";
import sendOtp from "../email-verification/sendOtp";

@Injectable()
export class StarlingService{
    constructor(
        @Inject('STARLING_MODEL')
        private starlingModel: Model<Starling>,

        @Inject('OTP_MODEL')
        private otpModel: Model<Otp>,

    ) {}

    async get(){

    }


}