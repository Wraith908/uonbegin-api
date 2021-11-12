import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { Info } from './models/info.entity';
import { InfoCreateDto } from './models/info-create.dto';
import { InfoUpdateDto } from './models/info-update.dto';
import { InfoService } from './info.service';
import { Response } from 'express';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';

@Controller('info')
export class InfoController {
  constructor(private infoService: InfoService) {}

  @Get()
  async all() {
    return await this.infoService.all();
  }

  @Get('section/:id')
  async getSection(@Param('id') sectionId: number) {
    return this.infoService.paginateFilterBySection(sectionId);
  }

  //General info stuff
  @UseGuards(AuthGuard)
  @Post()
  async createInfo(@Body() info: InfoCreateDto) {
    return this.infoService.create({
      title: info.title,
      body: info.body,
      section_id: info.section_id,
      image_url: info.image_url || null
    });
  }
  @Get(':id')
  async get(@Param('id') id: number) {
    return this.infoService.findOne({id});
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: InfoUpdateDto
  ) {
    await this.infoService.update(id, {
      title: body.title,
      body: body.body,
      section_id: body.section_id,
      image_url: body.image_url || null
    });

    return this.infoService.findOne({id});
 }

 @UseGuards(AuthGuard)
 @Delete(':id')
 async delete(@Param('id') id: number) {
   return this.infoService.delete(id);
 }
}
