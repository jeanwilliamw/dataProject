import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { UserRepository } from './users.repository';
import { PassportModule } from '@nestjs/passport';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [UsersController],
      providers: [UsersService, UserRepository],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  const mockUser = {
    id: 1,
    username: 'John Doe',
    email: 'john@example.com',
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
  } as User;

  const mockUsers = [mockUser];

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockUsers);

      const result = await controller.findAll();

      expect(result).toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockUser);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = { username: 'Updated Name' };
      jest.spyOn(service, 'update').mockResolvedValue(mockUser);

      const result = await controller.update('1', updateUserDto);

      expect(result).toEqual(mockUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(mockUser);

      const result = await controller.remove('1');

      expect(result).toEqual(mockUser);
    });
  });
});
