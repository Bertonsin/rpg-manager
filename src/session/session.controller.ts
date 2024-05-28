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
import { SessionService } from './session.service';

@Controller('/sessions')
@ApiTags('Sessions')
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
  @ApiBody({
    type: 'application/json',
    schema: {
      type: 'object',
      example: {
        name: 'Session example',
        story_id: '1',
      },
    },
  })
  @HttpCode(HttpStatus.CREATED)
  async createSession(@Body() body: Prisma.SessionUncheckedCreateInput) {
    return await this.sessionService.create(body);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateSession(
    @Body() body: Prisma.SessionUncheckedUpdateInput,
    @Param() params: { id: string },
  ) {
    await this.sessionService.update(body, params.id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSession(@Param() params: { id: string }) {
    await this.sessionService.delete(params.id);
  }
}
