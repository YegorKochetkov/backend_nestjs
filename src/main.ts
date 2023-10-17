import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { get } from 'http';
import { createWriteStream } from 'fs';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validation.pipe';

dotenv.config();

const serverUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://backend-nestjs-liart.vercel.app'
    : 'https://backend-nestjs-liart.vercel.app';

const start = async () => {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Users backend example')
    .setDescription(
      `<h3>REST API documentation</h3><p>The endpoints don't have much sense,
			 API was created to get acquainted with the possibilities of NextJS.</p>
			 <p>Be free to create users, give them admin rights, add posts and ban
			 them!</p>`,
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api/docs', app, swaggerDocument);

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

  // get the swagger json file (if app is running in development mode)
  if (process.env.NODE_ENV === 'development') {
    // write swagger ui files
    get(`${serverUrl}/swagger/swagger-ui-bundle.js`, function (response) {
      response.pipe(createWriteStream('api/docs/swagger-ui-bundle.js'));
      console.log(
        `Swagger UI bundle file written to: '/api/docs/swagger-ui-bundle.js'`,
      );
    });

    get(`${serverUrl}/swagger/swagger-ui-init.js`, function (response) {
      response.pipe(createWriteStream('api/docs/swagger-ui-init.js'));
      console.log(
        `Swagger UI init file written to: '/api/docs/swagger-ui-init.js'`,
      );
    });

    get(
      `${serverUrl}/swagger/swagger-ui-standalone-preset.js`,
      function (response) {
        response.pipe(
          createWriteStream('api/docs/swagger-ui-standalone-preset.js'),
        );
        console.log(
          `Swagger UI standalone preset file written to: '/api/docs/swagger-ui-standalone-preset.js'`,
        );
      },
    );

    get(`${serverUrl}/swagger/swagger-ui.css`, function (response) {
      response.pipe(createWriteStream('api/docs/swagger-ui.css'));
      console.log(`Swagger UI css file written to: '/api/docs/swagger-ui.css'`);
    });
  }
};

start();
