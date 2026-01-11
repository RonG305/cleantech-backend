import { Module } from '@nestjs/common';
import { ServiceRequestService } from './service-request.service';
import { ServiceRequestController } from './service-request.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ServiceRequestController],
  providers: [ServiceRequestService, PrismaService, JwtService],
})
export class ServiceRequestModule {}
