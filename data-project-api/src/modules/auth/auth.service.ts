import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const { password: userPassword, ...userWOPassword } = user;

    if (user && (await this.comparePasswords(password, userPassword))) {
      return {
        access_token: await this.generateToken(userWOPassword),
        user: userWOPassword,
      };
    }
    throw new UnauthorizedException('Invalid email or password');
  }

  async register(user: CreateUserDto) {
    const hashedPassword = await this.hashPassword(user.password);
    const newUser = await this.usersService.create({
      ...user,
      password: hashedPassword,
    });
    const token = await this.generateToken(newUser);
    return {
      access_token: token,
      user: newUser,
    };
  }

  async generateToken(
    user: Omit<User, 'password' | 'createdAt' | 'updatedAt'>,
  ): Promise<string> {
    const payload = { email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }

  async validateUser(user: User) {
    const foundUser = await this.usersService.findByEmail(user.email);
    if (!foundUser) {
      return null;
    }
    return foundUser;
  }
}
