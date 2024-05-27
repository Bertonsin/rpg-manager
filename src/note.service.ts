import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { prisma } from './prisma/prisma-client';

@Injectable()
export class NoteService {
  async findMany() {
    const notes = await prisma.note.findMany({
      where: {
        deleted_at: null,
      },
    });
    return notes;
  }

  async findOne(id: string) {
    const note = await prisma.note.findUnique({
      where: {
        id,
        deleted_at: null,
      },
    });
    if (!note) throw new NotFoundException();
    return note;
  }

  async create(body: Prisma.NoteUncheckedCreateInput) {
    const note = await prisma.note.create({
      data: body,
    });
    return note.id;
  }

  async update(body: Prisma.NoteUpdateInput, id: string) {
    const note = await this.findOne(id);
    if (!note) throw new NotFoundException();
    await prisma.note.update({
      data: body,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const note = await this.findOne(id);
    if (!note) throw new NotFoundException();
    await prisma.note.update({
      data: { deleted_at: new Date() },
      where: { id, deleted_at: null },
    });
  }
}
