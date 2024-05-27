import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [NoteModule, SessionModule],
})
export class HttpModule {}
