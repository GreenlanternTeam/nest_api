import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CreateUerDTO } from './users/users.dto';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() user: User) {
    const token = await this.authService.login(user);
    return { success: true, ...token };
  }

  @UsePipes(ValidationPipe)
  @Post('signup')
  async signUp(@Body() userCreateDTO: CreateUerDTO) {
    const user = await this.usersService.create(userCreateDTO);
    const { password, ...rest } = user;
    return { success: true, user: { ...rest } };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return { success: true, user: { ...req.user } };
  }
}
