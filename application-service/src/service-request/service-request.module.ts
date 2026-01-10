import { Module } from '@nestjs/common';
import { ServiceRequestService } from './service-request.service';
import { ServiceRequestController } from './service-request.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ServiceRequestController],
  providers: [ServiceRequestService, PrismaService],
})
export class ServiceRequestModule {}
