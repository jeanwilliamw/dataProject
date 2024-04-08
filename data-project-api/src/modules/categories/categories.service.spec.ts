import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './categories.service';
import { CategoryRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PassportModule } from '@nestjs/passport';

describe('CategoryService', () => {
  let service: CategoryService;
  let repository: CategoryRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      providers: [
        CategoryService,
        {
          provide: CategoryRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    repository = module.get<CategoryRepository>(CategoryRepository);
  });

  const categories = [
    {
      id: 1,
      name: 'Category 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Category 2',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const category = {
    id: 1,
    name: 'Test Category',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const createCategoryDto: CreateCategoryDto = {
        name: 'Test Category',
      };

      await service.create(createCategoryDto);

      expect(repository.create).toHaveBeenCalledWith(createCategoryDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue(categories);

      const result = await service.findAll();

      expect(result).toEqual(categories);
    });
  });

  describe('findById', () => {
    it('should return a category by id', async () => {
      const categoryId = 1;

      jest.spyOn(repository, 'findById').mockResolvedValue(category);

      const result = await service.findById(categoryId);

      expect(result).toEqual(category);
    });

    it('should return null if category is not found', async () => {
      const categoryId = 999;

      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      const result = await service.findById(categoryId);

      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const categoryId = 1;
      const updateData = { name: 'Updated Category' };

      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ ...category, ...updateData, id: categoryId });

      const result = await service.update(categoryId, updateData);

      expect(result).toEqual({ ...category, ...updateData, id: categoryId });
    });

    it('should return null if category is not found', async () => {
      const categoryId = 999;

      jest.spyOn(repository, 'update').mockResolvedValue(null);

      const result = await service.update(categoryId, {});

      expect(result).toBeNull();
    });
  });

  describe('delete', () => {
    it('should delete a category', async () => {
      const categoryId = 1;

      jest.spyOn(repository, 'delete').mockResolvedValue(category);

      const result = await service.delete(categoryId);

      expect(result).toEqual(category);
    });

    it('should return null if category is not found', async () => {
      const categoryId = 999;

      jest.spyOn(repository, 'delete').mockResolvedValue(null);

      const result = await service.delete(categoryId);

      expect(result).toBeNull();
    });
  });
});
