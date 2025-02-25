import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RequestsGateway } from './requests.gateway';

@Module({
  imports:[PrismaModule],
  providers: [RequestsService,RequestsGateway],
  controllers: [RequestsController]
})
export class RequestsModule {}
