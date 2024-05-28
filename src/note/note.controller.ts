/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { NoteService } from './note.service';

@Controller('/notes')
@ApiTags('Notes')
export class NoteController {
  constructor(private NoteService: NoteService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getNoteList() {
    return await this.NoteService.findMany();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getNote(@Param() params: { id: string }) {
    return await this.NoteService.findOne(params.id);
  }

  @Post()
  @ApiBody({
    type: 'application/json',
    schema: {
      type: 'object',
      example: {
        content: 'Note example',
        story_id: '1',
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  async createNote(@Body() body: Prisma.NoteUncheckedCreateInput) {
    return await this.NoteService.create(body);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateNote(
    @Body() body: Prisma.NoteUpdateInput,
    @Param() params: { id: string },
  ) {
    await this.NoteService.update(body, params.id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteNote(@Param() params: { id: string }) {
    await this.NoteService.delete(params.id);
  }
}
