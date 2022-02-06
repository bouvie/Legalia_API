import {Controller, Request, Post, Body, UseGuards, Req} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import {Public} from "./auth/auth.module";
import {AuthGuard} from "@nestjs/passport";
import {usersLoginDTO} from "./users/users.model";

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Body() user : usersLoginDTO) {
    return this.authService.login(user);
  }
}
