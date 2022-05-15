import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(validateUserDTO: LoginUserDTO): Promise<any> {
    const user = await this.usersService.findOne(validateUserDTO);
    if (user && user.password === validateUserDTO.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const findUser = await this.usersService.findOne({ userId: user.userId });
    const payload = {
      userId: user.userId,
      email: findUser.email,
      nickName: findUser.nickName,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
