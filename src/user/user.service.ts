import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { scrypt as _s, randomBytes } from 'crypto';
import { promisify } from 'util';
import SingInUserDTO from 'src/auth/dto/sing-in.user.dto';
import { instanceToInstance } from 'class-transformer';
import UserDto from './dto/user.dto';
const scrypt = promisify(_s);
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async validateUser(email: string, password: string) {
    const user = await this.findUserByEmail(email);
    if (user.password !== password) {
      throw new BadRequestException('Invalid email or password');
    }
    return user;
  }
  async findUserByEmail(email: string) {
    const user = await this.prismaService.user.findFirst({ where: { email } });
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    return user;
  }
  async create(createUserDto: CreateUserDto) {
    const user = await this.prismaService.user.create({
      select: { id: true, email: true, name: true },
      data: {
        ...createUserDto,
        password: await this.hashPassword(createUserDto.password),
      },
    });
    return user;
  }

  async findOne(id: string) {
    const user = await this.prismaService.user.findFirst({ where: { id } });
    return user;
  }
  async hashPassword(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    return `${salt}.${hash.toString('hex')}`;
  }
  async verifyUser(user: SingInUserDTO) {
    const userFound = await this.findUserByEmail(user.email);
    const userPassword = await this.hashPassword(user.password);
    if (userFound.password != userPassword)
      throw new BadRequestException('Invalid email or password');
    return instanceToInstance<UserDto>(userFound);
  }
}
