import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UsersModule } from './users/users.module';

const start = async () => {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Users backend example')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .addTag('users')
    .build();

  app.setGlobalPrefix('api/v1');

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [UsersModule],
  });

  SwaggerModule.setup('api/docs', app, swaggerDocument);

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
};

start();
