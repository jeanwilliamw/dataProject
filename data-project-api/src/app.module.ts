import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { RoleAuthGuard } from './guards/role-auth-guard';
import { CollectsModule } from './modules/collects/collects.module';
import { ClientsModule } from './modules/clients/clients.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CorsModule } from '@nestjs/express';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CollectsModule,
    ClientsModule,
    CategoriesModule,
    CorsModule.forRoot({
      origin: 'https://dataproject.kheopsian.com',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, RoleAuthGuard],
})
export class AppModule {}
