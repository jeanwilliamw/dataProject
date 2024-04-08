import { Module } from '@nestjs/common';
import { CollectsService } from './collects.service';
import { CollectsController } from './collects.controller';
import { CollectsRepository } from './collects.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [CollectsController],
  providers: [CollectsService, CollectsRepository],
})
export class CollectsModule {}
