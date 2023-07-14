import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';

dotenv.config();

const start = async () => {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Users backend example')
    .setDescription(
      `<h3>REST API documentation</h3><p>The endpoints don't have much sense,
			 API was created to get acquainted with the possibilities of NextJS</p>`,
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, swaggerDocument);

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
};

start();
