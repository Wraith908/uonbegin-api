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
    return await this.infoService.paginate(page,['picture']);
  }

  //General info stuff
  @Post()
  async createInfo(@Body() info: InfoCreateDto): Promise<Info> {

    const { picture_id, ...data} = info;

    return this.infoService.create({
      ...data,
      picture: {picture_id: picture_id || null}
    })
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

    const {picture_id, ...data} = body;

    await this.infoService.update(id, {
      ...data,
      picture: {picture_id}
    });

    return this.infoService.findOne({id});
 }

 @Delete(':id')
 async delete(@Param('id') id: number) {
   return this.infoService.delete(id);
 }
}
