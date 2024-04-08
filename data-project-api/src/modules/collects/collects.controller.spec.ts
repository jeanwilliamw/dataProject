import { Test, TestingModule } from '@nestjs/testing';
import { CollectsController } from './collects.controller';
import { CollectsService } from './collects.service';
import { CollectsRepository } from './collects.repository';
import { PassportModule } from '@nestjs/passport';

describe('CollectsController', () => {
  let controller: CollectsController;
  let service: CollectsService;
  let repository: CollectsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [CollectsController],
      providers: [CollectsService, CollectsRepository],
    }).compile();

    controller = module.get<CollectsController>(CollectsController);
    service = module.get<CollectsService>(CollectsService);
    repository = module.get<CollectsRepository>(CollectsRepository);
  });

  const mockCollect = {
    id: 1,
    articlePrice: 10,
    categoryId: 1,
    clientId: 'clientId',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCollects = [mockCollect];

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of collects', async () => {
      jest.spyOn(service, 'getAll').mockResolvedValue(mockCollects);

      const result = await controller.findAll();

      expect(result).toEqual(mockCollects);
    });
  });

  describe('findOne', () => {
    it('should return a collect by id', async () => {
      jest.spyOn(service, 'getOne').mockResolvedValue(mockCollect);

      const result = await controller.findOne('1');

      expect(result).toEqual(mockCollect);
    });
  });

  describe('update', () => {
    it('should update a collect', async () => {
      const updateDto = {
        articlePrice: 20,
        categoryId: 2,
        clientId: 'updatedClientId',
      };
      jest.spyOn(service, 'update').mockResolvedValue(mockCollect);

      const result = await controller.update('1', updateDto);

      expect(result).toEqual(mockCollect);
    });
  });

  describe('remove', () => {
    it('should delete a collect', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(mockCollect);

      const result = await controller.remove('1');

      expect(result).toEqual(mockCollect);
    });
  });
});
