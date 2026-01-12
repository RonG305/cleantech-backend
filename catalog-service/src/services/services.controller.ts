import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { GetServiceDto } from './dto/get-services.dto';
import { AuthGuard } from 'src/auth.gurads';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createServiceDto: CreateServiceDto, @Req() req) {
    return this.servicesService.createService(createServiceDto, req.user);
  }

  @Get()
  getAllServices(@Query() getServiceDto: GetServiceDto) {
    return this.servicesService.getAllServices(getServiceDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.getServiceById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.updateService(id, updateServiceDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.deleteService(id);
  }
}
