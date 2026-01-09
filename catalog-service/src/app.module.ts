import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CategoriesModule, ServicesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
