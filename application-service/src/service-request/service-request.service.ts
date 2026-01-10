import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';
import { GetServiceRequestDto } from './dto/get-service-request.dto';
import { paginate } from 'src/common/pagination/paginate';
import Fuse from 'fuse.js';

@Injectable()
export class ServiceRequestService {

  private readonly logger = new Logger(ServiceRequestService.name);

  constructor(private readonly prisma: PrismaService) {}
  async createServiceRequest(createServiceRequestDto: CreateServiceRequestDto) {
    console.log('Creating service request with data:', createServiceRequestDto);
    const seervice_request = await this.prisma.serviceRequests.create({
      data: createServiceRequestDto,
    })
    return seervice_request;
  }

async getAllServiceRequests({ search, limit, page }: GetServiceRequestDto) {
    if (!page) page = 1;
    if (!limit) limit = 10;

    this.logger.log(`Fetching service requests - Page: ${page}, Limit: ${limit}, Search: ${search}`);

    const totalServiceRequests = await this.prisma.serviceRequests.count();
    const totalPages = Math.ceil(totalServiceRequests / limit);
    const url = 'service-requests';

    const pagination = paginate(totalPages, page, limit, totalServiceRequests, url);
    const serviceRequests = await this.prisma.serviceRequests.findMany({
      skip: Number((page - 1) * limit),
      take: Number(limit),
      orderBy: {
        createdAt: 'desc',
      },
    });

    const options = {
      keys: ['email'],
      threshold: 0.3,
    };

    const fuse = new Fuse(serviceRequests, options);
    if (search) {
      const result = fuse.search(search);
      const filteredServiceRequests = result.map((request) => request.item);
      return {
        data: filteredServiceRequests,
        ...pagination,
      };
    }

    return {
      data: serviceRequests,
      ...pagination,
    };
  }

  async getMyServiceRequests(userId: string, { search, limit, page }: GetServiceRequestDto) {
    if (!page) page = 1;
    if (!limit) limit = 10;

    const totalServiceRequests = await this.prisma.serviceRequests.count({ where: { user_id: userId } });
    const totalPages = Math.ceil(totalServiceRequests / limit);
    const url = 'service-requests/my-requests';

    const pagination = paginate(totalPages, page, limit, totalServiceRequests, url);

    const serviceRequests = await this.prisma.serviceRequests.findMany({
      skip: Number((page - 1) * limit),
      take: Number(limit),
      where: { user_id: userId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const options = {
      keys: ['email'],
      threshold: 0.3,
    }

    const fuse = new Fuse(serviceRequests, options);
    if (search) {
      const result = fuse.search(search);
      const filteredServiceRequests = result.map((request) => request.item);
      return {
        data: filteredServiceRequests,
        ...pagination,
      };
    }
    return {
      data: serviceRequests,
      ...pagination,
    };
  }

  async getProviderServiceRequests(providerId: string, { search, limit, page }: GetServiceRequestDto) {
    if (!page) page = 1;
    if (!limit) limit = 10;

    const totalServiceRequests = await this.prisma.serviceRequests.count({ where: { provider_id: providerId } });
    const totalPages = Math.ceil(totalServiceRequests / limit);
    const url = 'service-requests/provider-requests';

    const pagination = paginate(totalPages, page, limit, totalServiceRequests, url);

    const serviceRequests = await this.prisma.serviceRequests.findMany({
      skip: Number((page - 1) * limit),
      take: Number(limit),
      where: { provider_id: providerId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const options = {
      keys: ['email'],
      threshold: 0.3,
    }

    const fuse = new Fuse(serviceRequests, options);
    if (search) {
      const result = fuse.search(search);
      const filteredServiceRequests = result.map((request) => request.item);
      return {
        data: filteredServiceRequests,
        ...pagination,
      };
    }
    return {
      data: serviceRequests,
      ...pagination,
    };
  }

  async getServiceRequestById(id: string) {
    const serviceRequest = await this.prisma.serviceRequests.findUnique({
      where: { id },
    })
    return serviceRequest;
  }

  async updateServiceRequest(id: string, updateServiceRequestDto: UpdateServiceRequestDto) {
    const serviceRequest = await this.prisma.serviceRequests.update({
      where: { id },
      data: updateServiceRequestDto,
    });
    return serviceRequest;
  }

  async deleteServiceRequest(id: string) {
    const serviceRequest = await this.prisma.serviceRequests.delete({
      where: { id },
    });
    return serviceRequest;
  }
}
