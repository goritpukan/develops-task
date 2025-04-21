import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import {ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  ;
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get<number>('PORT');

    app.enableCors({
        origin: true,
        credentials: true,
    });

  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
  );
  await app.listen(port ?? 8800);
}
bootstrap();
