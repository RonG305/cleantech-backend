import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceRequestModule } from './service-request/service-request.module';

@Module({
  imports: [ServiceRequestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
