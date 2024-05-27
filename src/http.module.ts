import { Module } from '@nestjs/common';
import { NoteModule } from './note/note.module';
import { SessionModule } from './session/session.module';
import { StoryModule } from './story/story.module';

@Module({
  imports: [NoteModule, SessionModule, StoryModule],
})
export class HttpModule {}
