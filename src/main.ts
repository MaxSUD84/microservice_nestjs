import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /** Config Service */
  const config = app.get(ConfigService);

  /** Main Api Port */
  const port = config.get<number>('API_PORT', 5000);

  app.enableShutdownHooks();

  // Swagger
  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('postApp')
    .setDescription('## API postApp')
    .setVersion('1.0')
    .addServer(`http://localhost:${port}/`, 'Local server')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(port, () => {
    Logger.log(`Main app started on "${port}" port`, 'MAIN');
    Logger.log(
      `Swagger documentation on http://localhost:${port}/api-doc`,
      'SWAGGER',
    );
  });
}
bootstrap();
