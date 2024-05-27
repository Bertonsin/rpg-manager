import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { prisma } from 'src/prisma/prisma-client';

@Injectable()
export class SessionService {
  constructor() {}

  async findMany() {
    return await prisma.session.findMany();
  }

  async findOne(id: string) {
    return await prisma.session.findUnique({
      where: {
        id,
      },
    });
  }

  async create(body: Prisma.SessionUncheckedCreateInput) {
    const { id } = await prisma.session.create({
      data: body,
    });
    return id;
  }

  async update(body: Prisma.SessionUncheckedUpdateInput, id: string) {
    await prisma.session.update({
      data: body,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    await prisma.session.update({
      data: { deleted_at: new Date() },
      where: {
        id,
      },
    });
  }
}
