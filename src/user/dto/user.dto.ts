import { Prisma } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';

export default class UserDto {
  id?: string;
  @IsEmail()
  email: string;

  @IsString()
  name: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  playlists?: Prisma.PlaylistCreateNestedManyWithoutUserInput;
}
