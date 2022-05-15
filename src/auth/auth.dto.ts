import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';
export class LoginUserDTO implements Prisma.UserWhereInput {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
