import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { plainToInstance } from 'class-transformer';
import SingInUserDTO from './dto/sing-in.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('/login')
  async login() {
    const user = await this.authService.signIn(
      plainToInstance(SingInUserDTO, {
        email: 'test@test.com',
        password: 'test',
      }),
    );
    return user;
  }
}
