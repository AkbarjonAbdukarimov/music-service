import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SingUpUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
