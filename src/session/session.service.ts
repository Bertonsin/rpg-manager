import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { prisma } from 'src/prisma/prisma-client';

@Injectable()
export class SessionService {
  constructor() {}

  async findMany() {
    return await prisma.session.findMany();
  }

  async findOne(id: string) {
    const session = await prisma.session.findUnique({
      where: {
        id,
      },
    });
    if (!session) throw new NotFoundException();
    return session;
  }

  async create(body: Prisma.SessionUncheckedCreateInput) {
    const { id } = await prisma.session.create({
      data: body,
    });
    return id;
  }

  async update(body: Prisma.SessionUncheckedUpdateInput, id: string) {
    const session = await prisma.session.findUnique({
      where: {
        id,
      },
    });
    if (!session) throw new NotFoundException();
    await prisma.session.update({
      data: body,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const session = await prisma.session.findUnique({
      where: {
        id,
      },
    });
    if (!session) throw new NotFoundException();
    await prisma.session.update({
      data: { deleted_at: new Date() },
      where: {
        id,
      },
    });
  }
}
