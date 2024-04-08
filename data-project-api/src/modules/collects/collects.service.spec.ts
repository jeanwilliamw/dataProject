import { Test, TestingModule } from '@nestjs/testing';
import { CollectsService } from './collects.service';
import { CollectsRepository } from './collects.repository';
import { PassportModule } from '@nestjs/passport';

describe('CollectsService', () => {
  let service: CollectsService;
  let repository: CollectsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      providers: [CollectsService, CollectsRepository],
    }).compile();

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
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of collects', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue(mockCollects);

      const result = await service.getAll();

      expect(result).toEqual(mockCollects);
    });
  });

  describe('getOne', () => {
    it('should return a collect by id', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(mockCollect);

      const result = await service.getOne(1);

      expect(result).toEqual(mockCollect);
    });
  });

  describe('update', () => {
    it('should update a collect', async () => {
      const updateData = { articlePrice: 20 };
      jest.spyOn(repository, 'update').mockResolvedValue(mockCollect);

      const result = await service.update(1, updateData);

      expect(result).toEqual(mockCollect);
    });
  });

  describe('delete', () => {
    it('should delete a collect', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue(mockCollect);

      const result = await service.delete(1);

      expect(result).toEqual(mockCollect);
    });
  });
});
