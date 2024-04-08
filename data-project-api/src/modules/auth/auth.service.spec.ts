import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { PassportModule } from '@nestjs/passport';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
  });

  const user = {
    email: 'test@example.com',
    password: 'hashedPassword',
    role: 'USER',
  } as User;

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return access token and user when credentials are correct', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const { password: _, ...userWOPassword } = user;

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      jest.spyOn(service, 'generateToken').mockResolvedValue('fakeToken');

      const result = await service.login(loginDto);

      expect(result.access_token).toEqual('fakeToken');
      expect(result.user).toEqual(userWOPassword);
    });

    it('should throw UnauthorizedException when credentials are incorrect', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'wrongPassword',
      };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });

  describe('register', () => {
    it('should return access token and user when registration is successful', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role: 'USER',
      };
      const newUser = { ...createUserDto, id: 1, role: 'USER' } as User;

      jest.spyOn(service, 'hashPassword').mockResolvedValue('hashedPassword');
      jest.spyOn(usersService, 'create').mockResolvedValue(newUser);
      jest.spyOn(service, 'generateToken').mockResolvedValue('fakeToken');

      const result = await service.register(createUserDto);

      expect(result.access_token).toBe('fakeToken');
      expect(result.user).toBe(newUser);
    });
  });

  describe('validateUser', () => {
    it('should return user when user exists', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);

      const result = await service.validateUser(user);

      expect(result).toBe(user);
    });

    it('should return null when user does not exist', async () => {
      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

      const result = await service.validateUser(user);

      expect(result).toBeNull();
    });
  });
});
