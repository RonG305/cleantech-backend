import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports : [
     ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'notifications_queue',
          queueOptions: {
            durable: true,
            persistent: true,
          },
        },
        transport: Transport.RMQ,
      },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
