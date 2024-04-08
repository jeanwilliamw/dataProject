import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { PassportModule } from '@nestjs/passport';

describe('Main', () => {
  let app;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PassportModule.register({ defaultStrategy: 'jwt' })],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.listen(3000);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should listen on port 3000', async () => {
    const url = await app.getUrl();
    expect(url).toMatch(/http:\/\/(localhost|\[::1\]):3000/);
  });
});
