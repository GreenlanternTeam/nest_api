import { BadRequestException, Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUerDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}
  async allUsers(): Promise<User[]> {
    return await this.prismaService.user.findMany({});
  }

  async findOne(findUserDTO: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { userId: findUserDTO.userId },
    });
  }

  async create(userCreateDTO: CreateUerDTO): Promise<User> {
    const exist = await this.prismaService.user.findUnique({
      where: { email: userCreateDTO.email },
      rejectOnNotFound: false,
    });
    if (exist) {
      throw new BadRequestException('이미 존재하는 이메일 입니다.');
    }
    const existUserId = await this.prismaService.user.findUnique({
      where: { userId: userCreateDTO.userId },
    });
    if (existUserId) {
      throw new BadRequestException('이미 존재하는 아이디 입니다.');
    }
    return await this.prismaService.user.create({ data: userCreateDTO });
  }
}
