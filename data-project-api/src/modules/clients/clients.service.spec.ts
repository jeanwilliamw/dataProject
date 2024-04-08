import { ClientsService } from './clients.service';
import { Client, Collect } from '@prisma/client';
import { ClientRepository } from './clients.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';

describe('ClientsService', () => {
  let service: ClientsService;
  let repository: ClientRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      providers: [ClientsService, ClientRepository],
    }).compile();

    service = module.get<ClientsService>(ClientsService);
    repository = module.get<ClientRepository>(ClientRepository);
  });

  const mockClient: Client = {
    id: '1',
    buyDate: new Date(),
    pricePaid: 100,
    numberOfChildren: 2,
    city: 'Test City',
    workCategory: 'Test Work Category',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockCollects: Collect[] = [
    {
      id: 1,
      articlePrice: 10,
      categoryId: 1,
      clientId: 'randomUUID',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockCompleteClient: Client & { collects: Collect[] } = {
    ...mockClient,
    collects: mockCollects,
  };

  describe('create', () => {
    it('should create a client', async () => {
      jest
        .spyOn(repository, 'createWithCollects')
        .mockResolvedValue(mockClient);

      const result = await service.create(mockCompleteClient);

      expect(result).toEqual(mockClient);
    });
  });

  describe('getAll', () => {
    it('should return all clients', async () => {
      const mockClients: Client[] = [mockClient];
      jest.spyOn(repository, 'findAll').mockResolvedValue(mockClients);

      const result = await service.getAll();

      expect(result).toEqual(mockClients);
    });
  });

  describe('getById', () => {
    it('should return a client by id', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(mockClient);

      const result = await service.getById('1');

      expect(result).toEqual(mockClient);
    });
  });

  describe('update', () => {
    it('should update a client', async () => {
      jest.spyOn(repository, 'update').mockResolvedValue(mockClient);

      const result = await service.update('1', mockCompleteClient);

      expect(result).toEqual(mockClient);
    });
  });

  describe('delete', () => {
    it('should delete a client', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue(mockClient);

      const result = await service.delete('1');

      expect(result).toEqual(mockClient);
    });
  });

  describe('getAverageByWorkCategory', () => {
    it('should return average by work category', async () => {
      const mockClients: Client[] = [
        { ...mockClient, workCategory: 'Category A', pricePaid: 100 },
        { ...mockClient, workCategory: 'Category B', pricePaid: 200 },
        { ...mockClient, workCategory: 'Category A', pricePaid: 300 },
      ];
      jest.spyOn(repository, 'findAll').mockResolvedValue(mockClients);

      const result = await service.getAverageByWorkCategory();

      expect(result).toEqual({
        'Category A': 200,
        'Category B': 200,
      });
    });
  });

  describe('getAverageByCategoryByWorkCategory', () => {
    it('should return average by category by work category', async () => {
      const mockClients = [
        { ...mockClient, workCategory: 'Category A', collects: mockCollects },
        { ...mockClient, workCategory: 'Category B', collects: mockCollects },
        { ...mockClient, workCategory: 'Category A', collects: mockCollects },
      ];
      jest.spyOn(repository, 'findAll').mockResolvedValue(mockClients);

      const result = await service.getAverageByCategoryByWorkCategory();

      expect(result).toEqual({
        'Category A': { '1': 10 },
        'Category B': { '1': 10 },
      });
    });
  });
});
