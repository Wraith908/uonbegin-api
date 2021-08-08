import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { Info } from './models/info.entity';
import { InfoCreateDto } from './models/info-create.dto';
import { InfoUpdateDto } from './models/info-update.dto';
import { InfoService } from './info.service';
//import { PictureService } from '../picture/picture.service';
import { Request } from 'express';

@Controller('info')
export class InfoController {
  constructor(
    private infoService: InfoService
  ) {}

  @Get()
  async all(@Query('page') page: number = 1) {
    return await this.infoService.paginate(page);
  }

  @Post()
  async create(
    @Body() info: InfoCreateDto
  ): Promise<Info> {
    return this.infoService.create({
      title: info.title,
      body: info.body,
      section: info.section
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
    await this.infoService.update(id, body);

    return this.infoService.findOne({id});
 }

 @Delete(':id')
 async delete(@Param('id') id: number) {
   return this.infoService.delete(id);
 }

 //Add and remove photo may be required specifically
// @Put('addPhoto/:id')
// async addPicture(
//   @Param('id') id: number,
//   @Body() body: Body
//  ) {
//   const curr = await this.infoService.findOne({id});
//
// }
//
// @Put('removePhoto/:id')
// async removePicture(
//
//)
}
