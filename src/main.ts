import { NestFactory } from '@nestjs/core';
import { NoteModule } from './note.module';

async function bootstrap() {
  const app = await NestFactory.create(NoteModule);
  await app.listen(3000);
}
bootstrap();
