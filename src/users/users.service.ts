import {HttpException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Users} from "./users.model";
import {Model} from "mongoose";
import { Logger } from '@nestjs/common';
import mongoose from "mongoose";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(Users.name) private readonly usersModel: Model<Users>,
    ) {}

    async findByEmail(email: string): Promise<Users | undefined> {
        return this.usersModel.findOne({email : email});
    }

    async findById(userId: string): Promise<Users | undefined> {
        return this.usersModel.findOne({_id: userId});
    }


    async createOne(user : Partial<Users>): Promise<Users | undefined> {
        return this.usersModel.create(user);
    }

}
