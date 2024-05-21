import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { prisma } from './prisma/prisma-client';

@Injectable()
export class NoteService {
  async findMany() {
    const notes = await prisma.note.findMany();
    return notes;
  }

  async findOne(id: string) {
    const note = await prisma.note.findUnique({
      where: {
        id,
      },
    });
    if (!note) throw new NotFoundException();
    return note;
  }

  async create(body: Prisma.NoteCreateInput) {
    const note = await prisma.note.create({
      data: body,
    });
    return note.id;
  }

  async updateNote(body: Prisma.NoteUpdateInput, id: string) {
    const note = await this.findOne(id);
    if (!note) throw new NotFoundException();
    await prisma.note.update({
      data: body,
      where: {
        id,
      },
    });
  }

  async deleteNote(id: string) {
    const note = await this.findOne(id);
    if (!note) throw new NotFoundException();
    await prisma.note.delete({
      where: { id },
    });
  }
}
