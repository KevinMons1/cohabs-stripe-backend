import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/core/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
    bodyParser: true,
  });
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
