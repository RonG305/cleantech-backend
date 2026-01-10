import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ServiceRequestService } from './service-request.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';
import { GetServiceRequestDto } from './dto/get-service-request.dto';

@Controller('service-request')
export class ServiceRequestController {
  constructor(private readonly serviceRequestService: ServiceRequestService) {}

  @Post()
  create(@Body() createServiceRequestDto: CreateServiceRequestDto) {
    return this.serviceRequestService.createServiceRequest(createServiceRequestDto);
  }

  @Get()
  findAll(@Query() getServiceRequestDto: GetServiceRequestDto) {
    return this.serviceRequestService.getAllServiceRequests(getServiceRequestDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceRequestService.getServiceRequestById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceRequestDto: UpdateServiceRequestDto) {
    return this.serviceRequestService.updateServiceRequest(id, updateServiceRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceRequestService.deleteServiceRequest(id);
  }
}
