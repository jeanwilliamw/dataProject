import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { PassportModule } from '@nestjs/passport';

describe('AppModule', () => {
  let appModule: TestingModule;

  beforeEach(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule, PassportModule.register({ defaultStrategy: 'jwt' })],
    }).compile();
  });

  it('should be defined', () => {
    expect(appModule).toBeDefined();
  });
});
