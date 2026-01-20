import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { EVENTS } from 'src/events/events';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  findAll() {
    return this.notificationsService.findAll();
  }

  @EventPattern(EVENTS.SERVICE_REQUEST_CREATED)
handleServiceRequestCreated(@Payload() payload: any, @Ctx() context: RmqContext) {
  console.log('Notification event received:',  payload, context);
}

  @MessagePattern('findOneNotification')
  findOne(@Payload() id: number) {
    return this.notificationsService.findOne(id);
  }

  update(@Payload() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(
      updateNotificationDto.id,
      updateNotificationDto,
    );
  }

  @MessagePattern('removeNotification')
  remove(@Payload() id: number) {
    return this.notificationsService.remove(id);
  }
}
