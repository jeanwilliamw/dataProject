import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './users.repository'; // Import the UserRepository
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {} // Inject the UserRepository

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto);
  }

  async findAll() {
    return await this.userRepository.findAllUsers();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findUserById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userRepository.findUserById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return await this.userRepository.updateUser(id, updateUserDto);
  }

  async remove(id: number) {
    const existingUser = await this.userRepository.findUserById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return await this.userRepository.deleteUser(id);
  }
}
