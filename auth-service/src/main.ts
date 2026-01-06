import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1/auth-service');
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  })

   const config = new DocumentBuilder()
    .setTitle('Cleantech authservice backend')
    .setDescription('Cleantech authservice backend API documentation')
    .setVersion('1.0')
    .addTag('authservice')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/auth-service/docs', app, documentFactory);

    await app.listen(4001, '0.0.0.0');

    console.log(
  'DATABASE_URL runtime value:',
  process.env.DATABASE_URL,
  typeof process.env.DATABASE_URL,
  typeof process.env.JWT_SECRET
);


  console.log(`Application is running on: ${await app.getUrl()}/api/v1/auth-service`);
  console.log(`Swagger is running on: ${await app.getUrl()}/api/v1/auth-service/docs`);
}
bootstrap();
