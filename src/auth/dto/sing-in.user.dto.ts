import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export default class SingInUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
