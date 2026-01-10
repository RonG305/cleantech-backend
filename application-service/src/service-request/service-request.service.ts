import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';

@Injectable()
export class ServiceRequestService {
  constructor(private readonly prisma: PrismaService) {}
  async createServiceRequest(createServiceRequestDto: CreateServiceRequestDto) {
    const seervice_request = await this.prisma.serviceRequests.create({
      data: createServiceRequestDto,
    })
    return seervice_request;
  }

  findAll() {
    return `This action returns all serviceRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceRequest`;
  }

  update(id: number, updateServiceRequestDto: UpdateServiceRequestDto) {
    return `This action updates a #${id} serviceRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceRequest`;
  }
}
