import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

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
  app.setGlobalPrefix('api/v1/application-service');

  // Attach RabbitMQ microservice
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'notifications_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Cleantech application service backend')
    .setDescription('Cleantech application service backend API documentation')
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
  SwaggerModule.setup(
    'api/v1/application-service/docs',
    app,
    document,
  );

  await app.listen(4003);

  console.log(
    `Application is running on: ${await app.getUrl()}/api/v1/application-service`,
  );
  console.log(
    `Swagger is running on: ${await app.getUrl()}/api/v1/application-service/docs`,
  );
}

bootstrap();
