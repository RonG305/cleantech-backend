import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetServiceDto } from './dto/get-services.dto';
import { paginate } from 'src/common/pagination/paginate';
import Fuse from 'fuse.js';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService){}
  async createService(createServiceDto: CreateServiceDto, user: any) {
    const service = await this.prisma.service.create({
      data: {
        ...createServiceDto,
        provider_id: user.sub,
      },
    });
    return service;
  }

   async getAllServices({ search, limit, page }: GetServiceDto): Promise<any> {
    if (!page) page = 1;
    if (!limit) limit = 10;

    const totalServices = await this.prisma.service.count();
    const totalPages = Math.ceil(totalServices / limit);
    const url = 'services';

    const pagination = paginate(totalPages, page, limit, totalServices, url);
    const services = await this.prisma.service.findMany({
      include: {
        category: true,
      },
      skip: Number((page - 1) * limit),
      take: Number(limit),
      orderBy: {
        createdAt: 'desc',
      },
    });

    const options = {
      keys: ['name', "description"],
      threshold: 0.3,
    };

    const fuse = new Fuse(services, options);
    if (search) {
      const result = fuse.search(search);
      const filteredServices = result.map((service) => service.item);
      return {
        results: filteredServices,
        ...pagination
      };
    }

    return {
      
      results: services,
      ...pagination,
    };
  }

   async getAllProviderServices({ search, limit, page }: GetServiceDto, providerId: string): Promise<any> {
    if (!page) page = 1;
    if (!limit) limit = 10;

    const totalServices = await this.prisma.service.count({
      where: { provider_id: providerId },
    });
    const totalPages = Math.ceil(totalServices / limit);
    const url = 'services';

    const pagination = paginate(totalPages, page, limit, totalServices, url);
    const services = await this.prisma.service.findMany({
      where: { provider_id: providerId },
      include: {
        category: true,
      },
      skip: Number((page - 1) * limit),
      take: Number(limit),
      orderBy: {
        createdAt: 'desc',
      },
    });

    const options = {
      keys: ['name', "description"],
      threshold: 0.3,
    };

    const fuse = new Fuse(services, options);
    if (search) {
      const result = fuse.search(search);
      const filteredServices = result.map((service) => service.item);
      return {
        results: filteredServices,
        ...pagination
      };
    }

    return {
      
      results: services,
      ...pagination,
    };
  }


  async getServiceById(id: string) {
     const service = await this.prisma.service.findUnique({
      where: { id },
    });
    return service;
  }

  async updateService(id: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });
    return service;
  }

  async deleteService(id: string) {
    const service = await this.prisma.service.delete({
      where: { id },
    });
    return service;
  }
}
