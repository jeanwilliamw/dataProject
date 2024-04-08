import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { ClientRepository } from './clients.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [ClientsController],
  providers: [ClientsService, ClientRepository],
})
export class ClientsModule {}
