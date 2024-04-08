import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Auth } from '../../decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() login: LoginDto) {
    // Authenticate user and generate JWT token
    return await this.authService.login(login);
  }

  @Post('register')
  @Auth(['ADMIN'])
  async register(@Body() authBody: CreateUserDto) {
    // Register user and generate JWT token
    return await this.authService.register(authBody);
  }
}
