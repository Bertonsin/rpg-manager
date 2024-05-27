import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { prisma } from '../prisma/prisma-client';

@Injectable()
export class StoryService {
  async findMany() {
    const stories = await prisma.story.findMany({
      where: {
        deleted_at: null,
      },
    });
    return stories;
  }

  async findOne(id: string) {
    const story = await prisma.story.findUnique({
      where: {
        id,
        deleted_at: null,
      },
    });
    if (!story) throw new NotFoundException();
    return story;
  }

  async create(body: Prisma.StoryUncheckedCreateInput) {
    const story = await prisma.story.create({
      data: body,
    });
    return story.id;
  }

  async update(body: Prisma.StoryUpdateInput, id: string) {
    const story = await this.findOne(id);
    if (!story) throw new NotFoundException();
    await prisma.story.update({
      data: body,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const story = await this.findOne(id);
    if (!story) throw new NotFoundException();
    await prisma.story.update({
      data: { deleted_at: new Date() },
      where: { id, deleted_at: null },
    });
  }
}
