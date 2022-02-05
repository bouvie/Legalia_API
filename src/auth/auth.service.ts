import {Injectable, Logger} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {Users, usersLoginDTO} from "../users/users.model";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}


    async validateUser(email: string, pass: string): Promise<Partial<usersLoginDTO>> {
        const user = await this.usersService.findOne(email);
        if (user && user.password === pass) {
            const { password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: usersLoginDTO) {
        const payload = { email: user.email, sub: user._id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
