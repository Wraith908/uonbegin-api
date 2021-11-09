import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { Info } from './models/info.entity';
import { InfoCreateDto } from './models/info-create.dto';
import { InfoUpdateDto } from './models/info-update.dto';
import { InfoService } from './info.service';
import { Response } from 'express';
import { Request } from 'express';

@Controller('info')
export class InfoController {
  constructor(private infoService: InfoService) {}

  @Get()
  async all(@Query('page') page: number = 1) {
    return await this.infoService.paginate(page);
  }

  //General info stuff
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

 @Delete(':id')
 async delete(@Param('id') id: number) {
   return this.infoService.delete(id);
 }
}
