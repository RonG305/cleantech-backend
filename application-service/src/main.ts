import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      allowedHeaders: '*',
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    },
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix('api/v1/applications-service');

  const config = new DocumentBuilder()
    .setTitle('Cleantech Application Service Backend')
    .setDescription('Cleantech Application Service backend API documentation')
    .setVersion('1.0')
    .addTag('application service')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'jwt-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/applications-service/docs', app, document);

  await app.listen(4003);

  console.log(
    `Application is running on: ${await app.getUrl()}/api/v1/applications-service`,
  );
  console.log(
    `Swagger is running on: ${await app.getUrl()}/api/v1/applications-service/docs`,
  );
}

bootstrap();
