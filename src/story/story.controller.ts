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
import { Prisma } from '@prisma/client';
import { StoryService } from './story.service';

@Controller('/stories')
export class StoryController {
  constructor(private StoryService: StoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getStoryList() {
    return await this.StoryService.findMany();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getStory(@Param() params: { id: string }) {
    return await this.StoryService.findOne(params.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createStory(@Body() body: Prisma.StoryUncheckedCreateInput) {
    return await this.StoryService.create(body);
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateStory(
    @Body() body: Prisma.StoryUpdateInput,
    @Param() params: { id: string },
  ) {
    await this.StoryService.update(body, params.id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteStory(@Param() params: { id: string }) {
    await this.StoryService.delete(params.id);
  }
}
