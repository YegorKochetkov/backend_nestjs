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
			 API was created to get acquainted with the possibilities of NextJS.</p>
			 <p>Be free to create users, give them admin rights, add posts and ban
			 them!</p>
       <p>For convenience, a user with admin rights has already been created.
       You can log in with:</p>
       <p>user@mail.com</br>password12345</p>
       <p>In the response, you will receive a token that you need to enter
       in the form that opens by clicking on the "Authorize" button.`,
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, swaggerDocument, {
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  });

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
};

start();
