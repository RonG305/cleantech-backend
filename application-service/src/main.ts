import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule, 
    { cors: true, logger: ['error', 'warn', 'log', 'debug', 'verbose'] }
  );
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1/applications-service');
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  });

  const config = new DocumentBuilder()
    .setTitle('Cleantech applications service backend')
    .setDescription('Cleantech applications service backend API documentation')
    .setVersion('1.0')
    .addTag('applications service')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'jwt-auth',
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/applications-service/docs', app, documentFactory);

  await app.listen(4003, '0.0.0.0');

  console.log(
    `Application is running on: ${await app.getUrl()}/api/v1/applications-service`,
  );
  console.log(
    `Swagger is running on: ${await app.getUrl()}/api/v1/applications-service/docs`,
  );
}
bootstrap();
