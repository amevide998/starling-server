import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import {Model} from "mongoose";
import { User } from "../user/user.interface";
import {CreateStarlingDto} from "../../dto/createStarling.dto";
import {Starling} from "./starling.interface";
import {FirebaseStorageService} from "../../utils/firebaseStorage";

@Injectable()
export class StarlingService{
    constructor(
        @Inject('STARLING_MODEL')
        private starlingModel: Model<Starling>,

        @Inject('USER_MODEL')
        private userModel: Model<User>,


        private readonly firebaseStorage: FirebaseStorageService


    ) {}

    async registerStarling(
        createStarlingUserDto: CreateStarlingDto,
        image: Express.Multer.File,
        user: {email: string}
    ): Promise<String>{
        const userDb = await this.userModel.findOne({email: user.email})

        if(!userDb){
            throw new NotFoundException("user not found")
        }

        const starling = await this.starlingModel.findOne({userId: userDb._id});

        if(starling){
            if(!starling.verified){
                throw new BadRequestException("starling already exists, wait for approved from admin")
            }
            throw new BadRequestException("starling already registered");
        }

        const img_url = await this.firebaseStorage.uploadFile("starling-image", image) || createStarlingUserDto.image_url || "";

        const createdStarling = {
            userId: userDb._id,
            starlingName: createStarlingUserDto.starlingName,
            longitude: createStarlingUserDto.longitude,
            latitude: createStarlingUserDto.latitude,
            lastUpdate: new Date(),
            image: img_url,
            verified: false
        }

        // save starling form

        const starlingDb = await this.starlingModel.findOne({userId: userDb._id});
        if(starlingDb){
            if(starlingDb.verified){
                throw new BadRequestException("starling already exists, wait for approved from admin")
            }
            throw new BadRequestException("starling already registered");
        }

        try{
            const starling = new this.starlingModel(createdStarling)
            await starling.save();
            return starling.starlingName
        }catch (err){
            console.log(`something error when create starling : ${err}`)
        }

    }


}