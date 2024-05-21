/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { NoteService } from './note.service';

@Controller()
export class NoteController {
  constructor(private NoteService: NoteService) {}
  @Get()
  async getNoteList() {
    return await this.NoteService.findMany();
  }

  @Get('/:id')
  async getNote(@Param() params: { id: string }) {
    return await this.NoteService.findOne(params.id);
  }

  @Post()
  async createNote(@Body() body: Prisma.NoteCreateInput) {
    return await this.NoteService.create(body);
  }

  @Put('/:id')
  async updateNote(
    @Body() body: Prisma.NoteUpdateInput,
    @Param() params: { id: string },
  ) {
    await this.NoteService.updateNote(body, params.id);
  }

  @Delete('/:id')
  async deleteNote(@Param() params: { id: string }) {
    await this.NoteService.deleteNote(params.id);
  }
}
