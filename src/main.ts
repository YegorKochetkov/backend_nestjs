import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const start = async () => {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Users backend example')
    .setDescription('<h3>REST API documentation</h3>')
    .setVersion('1.0.0')
    .build();

  app.setGlobalPrefix('api/v1');

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, swaggerDocument);

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
};

start();
