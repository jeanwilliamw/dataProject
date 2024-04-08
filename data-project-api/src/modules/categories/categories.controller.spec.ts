import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoryService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PassportModule } from '@nestjs/passport';

describe('CategoriesController', () => {
  let controller: CategoriesController;
  let service: CategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoryService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoryService>(CategoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      const createCategoryDto: CreateCategoryDto = {
        name: 'Test Category',
      };

      await controller.create(createCategoryDto);

      expect(service.create).toHaveBeenCalledWith(createCategoryDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of categories', async () => {
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

      jest.spyOn(service, 'findAll').mockResolvedValue(categories);

      const result = await controller.findAll();

      expect(result).toEqual(categories);
    });
  });

  describe('update', () => {
    it('should update a category', async () => {
      const id = '1';
      const updateCategoryDto: UpdateCategoryDto = {
        name: 'Updated Category',
        // Other properties...
      };

      await controller.update(id, updateCategoryDto);

      expect(service.update).toHaveBeenCalledWith(+id, updateCategoryDto);
    });
  });

  describe('remove', () => {
    it('should delete a category', async () => {
      const id = '1';

      await controller.remove(id);

      expect(service.delete).toHaveBeenCalledWith(+id);
    });
  });
});
