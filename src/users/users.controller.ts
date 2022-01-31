import {Controller, Logger, Post, Request} from '@nestjs/common';
import {UsersService} from './users.service'

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @Post('')
    async createOne(@Request() req) {
        return this.usersService.createOne(req.body);
    }

}
