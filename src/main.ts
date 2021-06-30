import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  if (!process.env.SWAGGER_ENABLE || process.env.SWAGGER_ENABLE === '1') {
    createSwagger(app);
  }

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.listen(3000).then(async () => {
    console.log(`Application is running on: ${await app.getUrl()}`);
  });
}

function createSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('NestJS + Typescript + Typeorm Ceccoff')
    .setDescription('The Ceccoff API description')
    .setVersion('1.0')
    .addTag('Ceccoff')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

bootstrap();
