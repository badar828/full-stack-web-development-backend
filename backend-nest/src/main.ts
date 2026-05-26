import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Allows your React frontend to connect!
  await app.listen(3001); // Runs NestJS on port 3001
}
bootstrap();