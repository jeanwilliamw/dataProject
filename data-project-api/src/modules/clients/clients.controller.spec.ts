import { Test, TestingModule } from '@nestjs/testing';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { PassportModule } from '@nestjs/passport';
import { ClientRepository } from './clients.repository';

describe('ClientsController', () => {
  let controller: ClientsController;
  let service: ClientsService;
  let repository: ClientRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [ClientsController],
      providers: [ClientsService, ClientRepository],
    }).compile();

    controller = module.get<ClientsController>(ClientsController);
    service = module.get<ClientsService>(ClientsService);
    repository = module.get<ClientRepository>(ClientRepository);
  });

  const client = {
    id: 'randomUUID',
    buyDate: new Date(),
    pricePaid: 100,
    numberOfChildren: 2,
    city: 'Test City',
    workCategory: 'Test Work Category',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const collects = [
    {
      id: 1,
      articlePrice: 10,
      categoryId: 1,
      clientId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const clientWithCollects = {
    ...client,
    collects,
  };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a client', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(clientWithCollects);

      const result = await controller.create(clientWithCollects);

      expect(result).toEqual(clientWithCollects);
    });
  });

  describe('findAll', () => {
    it('should return all clients', async () => {
      jest.spyOn(service, 'getAll').mockResolvedValue([clientWithCollects]);

      const result = await controller.findAll();

      expect(result).toEqual([clientWithCollects]);
    });
  });

  describe('getAverageByWorkCategory', () => {
    it('should return average price by work category', async () => {
      const results = {
        Analyste: 305.17596566523605,
        'Chef de projet': 355.0224215246637,
        Designer: 320.5228215767635,
        Développeur: 395.0163265306122,
        Marketing: 347.93869731800766,
        'Technicien support': 408.1709401709402,
        'Testeur qualité': 312.4978902953587,
      };

      jest
        .spyOn(service, 'getAverageByWorkCategory')
        .mockResolvedValue(results);

      const result = await controller.getAverageByWorkCategory();

      expect(result).toEqual(results);
    });
  });

  describe('getAverageByCategoryByWorkCategory', () => {
    it('should return average price by category by work category', async () => {
      const results = {
        Analyste: {
          '1': 52.73381294964029,
          '2': 56.24683544303797,
          '3': 50.1764705882353,
          '4': 54.64556962025316,
          '5': 52.46621621621622,
          '6': 50.19090909090909,
          '7': 58.91869918699187,
          '8': 63.43684210526316,
          '9': 66.93913043478261,
        },
        'Chef de projet': {
          '1': 57.63636363636363,
          '2': 67.46153846153847,
          '3': 52.375,
          '4': 63.8125,
          '5': 59.92727272727273,
          '6': 54.16541353383459,
          '7': 72.625,
          '8': 75.85,
          '9': 81.62424242424242,
        },
      };

      jest
        .spyOn(service, 'getAverageByCategoryByWorkCategory')
        .mockResolvedValue(results);

      const result = await controller.getAverageByCategoryByWorkCategory();

      expect(result).toEqual(results);
    });
  });

  describe('findOne', () => {
    it('should return a client by id', async () => {
      jest.spyOn(service, 'getById').mockResolvedValue(clientWithCollects);

      const result = await controller.findOne(clientWithCollects.id);

      expect(result).toEqual(clientWithCollects);
    });
  });

  describe('update', () => {
    it('should update a client', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(clientWithCollects);

      const result = await controller.update(
        clientWithCollects.id,
        clientWithCollects,
      );

      expect(result).toEqual(clientWithCollects);
    });
  });

  describe('remove', () => {
    it('should delete a client', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(clientWithCollects);

      const result = await controller.remove(clientWithCollects.id);

      expect(result).toEqual(clientWithCollects);
    });
  });
});
