import { PrismaService } from 'src/prisma/prisma.service';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';
import { GetServiceRequestDto } from './dto/get-service-request.dto';
import { paginate } from 'src/common/pagination/paginate';
import Fuse from 'fuse.js';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { EVENTS } from 'src/events/events';

@Injectable()
export class ServiceRequestService {
  private readonly logger = new Logger(ServiceRequestService.name);
  constructor(
    private readonly prisma: PrismaService,
    @Inject('NOTIFICATIONS_SERVICE') private notificationsClient: ClientProxy,
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
  ) {}

   @MessagePattern({cmd: 'get_user_by_id'})
  async getUserDetails(userId: string) {
    const userDetails = await this.authClient
      .send('get_user_by_id', { userId })
      .toPromise();
    return userDetails;
  }



  async createServiceRequest(createServiceRequestDto: CreateServiceRequestDto) {
    const userDetails = await this.getUserDetails(
      createServiceRequestDto.user_id,
    );

    this.logger.log('User Details:', userDetails);
    const serviceRequest = await this.prisma.serviceRequests.create({
      data: createServiceRequestDto,
    });

    const payload = serviceRequest;

    this.notificationsClient.emit(EVENTS.SERVICE_REQUEST_CREATED, payload);

    return serviceRequest;
  }

  
  async getAllNOtifications() {
    return this.notificationsClient.send('getAllNotifications', {});
  }



  async getAllServiceRequests(
    { search, limit, page }: GetServiceRequestDto,
    user: any,
  ) {
    if (!page) page = 1;
    if (!limit) limit = 10;

    this.logger.log('User from token:', user);

    const totalServiceRequests = await this.prisma.serviceRequests.count();
    const totalPages = Math.ceil(totalServiceRequests / limit);
    const url = 'service-requests';

    const pagination = paginate(
      totalPages,
      page,
      limit,
      totalServiceRequests,
      url,
    );
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

  async getMyServiceRequests(
    { search, limit, page }: GetServiceRequestDto,
    user: any,
  ) {
    if (!page) page = 1;
    if (!limit) limit = 10;

    const totalServiceRequests = await this.prisma.serviceRequests.count({
      where: { user_id: user.id },
    });
    const totalPages = Math.ceil(totalServiceRequests / limit);
    const url = 'service-requests/my-requests';

    const pagination = paginate(
      totalPages,
      page,
      limit,
      totalServiceRequests,
      url,
    );
    const serviceRequests = await this.prisma.serviceRequests.findMany({
      where: { user_id: user.sub },
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
        results: filteredServiceRequests,
        ...pagination,
      };
    }

    return {
      results: serviceRequests,
      ...pagination,
    };
  }

  async getProviderServiceRequests(
    providerId: string,
    { search, limit, page }: GetServiceRequestDto,
  ) {
    if (!page) page = 1;
    if (!limit) limit = 10;

    const totalServiceRequests = await this.prisma.serviceRequests.count({
      where: { provider_id: providerId },
    });
    const totalPages = Math.ceil(totalServiceRequests / limit);
    const url = 'service-requests/provider-requests';

    const pagination = paginate(
      totalPages,
      page,
      limit,
      totalServiceRequests,
      url,
    );

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
    };

    const fuse = new Fuse(serviceRequests, options);
    if (search) {
      const result = fuse.search(search);
      const filteredServiceRequests = result.map((request) => request.item);
      return {
        results: filteredServiceRequests,
        ...pagination,
      };
    }

    return {
      results: serviceRequests,
      ...pagination,
    };
  }

  async getServiceRequestById(id: string) {
    const serviceRequest = await this.prisma.serviceRequests.findUnique({
      where: { id },
    });
    return serviceRequest;
  }

  async updateServiceRequest(
    id: string,
    updateServiceRequestDto: UpdateServiceRequestDto,
  ) {
    const serviceRequest = await this.prisma.serviceRequests.update({
      where: { id },
      data: updateServiceRequestDto as any,
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
