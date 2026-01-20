import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { EVENTS } from './events/events';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


}
