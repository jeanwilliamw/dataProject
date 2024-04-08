import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '@prisma/client';
import { PassportModule } from '@nestjs/passport';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  const token = {
    access_token: 'fakeToken',
    user: {
      username: 'testuser',
      email: 'test@example.com',
      role: 'USER',
    } as User,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a JWT token', async () => {
      const loginDto: LoginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      jest.spyOn(authService, 'login').mockResolvedValue(token);

      const result = await controller.login(loginDto);

      expect(result).toBe(token);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('register', () => {
    it('should return a JWT token', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        role: 'USER',
      };

      jest.spyOn(authService, 'register').mockResolvedValue(token);

      const result = await controller.register(createUserDto);

      expect(result).toBe(token);
      expect(authService.register).toHaveBeenCalledWith(createUserDto);
    });
  });
});
