import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { PassportModule } from '@nestjs/passport';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useValue: {
            createUser: jest.fn(),
            findAllUsers: jest.fn(),
            findUserById: jest.fn(),
            findUserByEmail: jest.fn(),
            updateUser: jest.fn(),
            deleteUser: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UserRepository>(UserRepository);
  });

  const mockCreateUserDto: CreateUserDto = {
    username: 'John Doe',
    email: 'john@example.com',
    password: 'password',
    role: 'USER',
  };

  const mockUser = {
    id: 1,
    username: 'John Doe',
    email: 'john@example.com',
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
  } as User;

  const mockUpdateUserDto: UpdateUserDto = {
    username: 'Updated Name',
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      jest.spyOn(repository, 'createUser').mockResolvedValue(mockUser);

      const result = await service.create(mockCreateUserDto);

      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(repository, 'findAllUsers').mockResolvedValue([mockUser]);

      const result = await service.findAll();

      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      jest.spyOn(repository, 'findUserById').mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(repository, 'findUserById').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrowError(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      jest.spyOn(repository, 'findUserById').mockResolvedValue(mockUser);
      jest.spyOn(repository, 'updateUser').mockResolvedValue(mockUser);

      const result = await service.update(1, mockUpdateUserDto);

      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(repository, 'findUserById').mockResolvedValue(null);

      await expect(service.update(1, mockUpdateUserDto)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      jest.spyOn(repository, 'findUserById').mockResolvedValue(mockUser);
      jest.spyOn(repository, 'deleteUser').mockResolvedValue(mockUser);

      const result = await service.remove(1);

      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if user is not found', async () => {
      jest.spyOn(repository, 'findUserById').mockResolvedValue(null);

      await expect(service.remove(1)).rejects.toThrowError(NotFoundException);
    });
  });
});
