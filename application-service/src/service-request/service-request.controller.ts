import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { ServiceRequestService } from './service-request.service';
import { CreateServiceRequestDto } from './dto/create-service-request.dto';
import { UpdateServiceRequestDto } from './dto/update-service-request.dto';
import { GetServiceRequestDto } from './dto/get-service-request.dto';
import { AuthGuard } from 'src/auth.gurads';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('service-request')
@ApiBearerAuth('jwt-auth')
@UseGuards(AuthGuard) 
export class ServiceRequestController {
  constructor(private readonly serviceRequestService: ServiceRequestService) {}

  @Post()
  create(@Body() createServiceRequestDto: CreateServiceRequestDto) {
    return this.serviceRequestService.createServiceRequest(createServiceRequestDto);
  }

  @Get()
  findAll(@Query() getServiceRequestDto: GetServiceRequestDto, @Req() req) {
    return this.serviceRequestService.getAllServiceRequests(getServiceRequestDto, req.user);
  }

  @Get('my-requests')
  findMyRequests(@Query() getServiceRequestDto: GetServiceRequestDto, @Req() req) {
    return this.serviceRequestService.getMyServiceRequests(getServiceRequestDto, req.user);
  }

  @Get('provider-requests')
  findProviderRequests(@Query('providerId') providerId: string, @Query() getServiceRequestDto: GetServiceRequestDto) {
    return this.serviceRequestService.getProviderServiceRequests(providerId, getServiceRequestDto);
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
