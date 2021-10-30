import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { Info } from './models/info.entity';
import { InfoCreateDto } from './models/info-create.dto';
import { InfoUpdateDto } from './models/info-update.dto';
import { InfoService } from './info.service';
import { StaffInfo } from './models/staff-info.entity';
import { StaffInfoCreateDto } from './models/staff-info-create.dto';
import { StaffInfoUpdateDto } from './models/staff-info-update.dto';
import { StaffInfoService } from './staff-info.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import { Request } from 'express';

@Controller('info')
export class InfoController {
  constructor(
    private infoService: InfoService,
    private staffInfoService: StaffInfoService
  ) {}

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
      picture: {picture_id: picture_id}
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
    await this.infoService.update(id, body);

    return this.infoService.findOne({id});
 }

 @Delete(':id')
 async delete(@Param('id') id: number) {
   return this.infoService.delete(id);
 }

 //Staff info stuff
 @Get('staff')
 async allStaff(@Query('page') page: number = 1) {
   return await this.staffInfoService.paginate(page,['picture']);
 }

 @Get('staff/:id')
 async staffGet(@Param('id') id: number) {
   return this.staffInfoService.findOne({id});
 }

  @Post('staff')
  async createStaffInfo(
    @Body('staff-info') info: StaffInfoCreateDto
  ) {

    const { picture_id, ...data} = info;

    return this.staffInfoService.create({
      ...data,
      picture: {picture_id: picture_id}
    });
  }

  @Put('staff/:id')
  async staffUpdate(
    @Param('id') id: number,
    @Body() body: StaffInfoUpdateDto
  ) {
    await this.staffInfoService.update(id, body);

    return this.staffInfoService.findOne({id});
  }

  @Delete('staff/:id')
  async staffDelete(@Param('id') id: number) {
   return this.staffInfoService.delete(id);
  }

}
