import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import SingInUserDTO from './dto/sing-in.user.dto';
import UserDto from 'src/user/dto/user.dto';
import { SingUpUserDTO } from './dto/sing-up.user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signToken(user: Partial<UserDto>) {
    return await this.jwtService.signAsync(user);
  }
  async validateToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }
  async signIn(user: SingInUserDTO) {
    const userFound = await this.userService.verifyUser(user);
    const token = await this.signToken(userFound);
    return { user: userFound, token };
  }
  async signUp(user: SingUpUserDTO) {
    const userFound = await this.userService.create(user);
    const token = await this.signToken(userFound);
    return { user: userFound, token };
  }
}
