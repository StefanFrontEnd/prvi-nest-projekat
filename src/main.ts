import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,   //6.3
      transformOptions: {  ///6.3
        enableImplicitConversion: true,  //6.3
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();
