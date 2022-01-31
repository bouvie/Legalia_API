import {Controller, Request, Post, UseGuards, Get} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import {JwtAuthGuard} from "./auth/jwt-auth.guard";
import {Public} from "./auth/auth.module";
import {AuthGuard} from "@nestjs/passport";

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    console.log(req.body)
    return this.authService.login(req.body);
  }
}
