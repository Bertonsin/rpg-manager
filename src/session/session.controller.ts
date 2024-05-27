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
import { Prisma } from '@prisma/client';
import { SessionService } from './session.service';

@Controller()
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  async getSessionList() {
    return await this.sessionService.findMany();
  }

  @Get('/:id')
  async getSession(@Param() params: { id: string }) {
    return await this.sessionService.findOne(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createSession(@Body() body: Prisma.SessionUncheckedCreateInput) {
    return await this.sessionService.create(body);
  }

  @Patch('/:id')
  async updateSession(
    @Body() body: Prisma.SessionUncheckedUpdateInput,
    @Param() params: { id: string },
  ) {
    await this.sessionService.update(body, params.id);
  }

  @Delete('/:id')
  async deleteSession(@Param() params: { id: string }) {
    await this.sessionService.delete(params.id);
  }
}
