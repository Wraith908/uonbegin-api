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
    return await this.infoService.paginate(page,['pictures']);
  }

  @Get('staff')
  async allStaff(@Query('page') page: number = 1) {
    return await this.staffInfoService.paginate(page,['pictures']);
  }

  //General info stuff
  @Post()
  async createInfo(
    @Body('info') info: InfoCreateDto
  ) {
    return this.infoService.create({
      title: info.title,
      body: info.body,
      section: info.section,
      pictureURL: info.pictureURL
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
  @Post('staff')
  async createStaffInfo(
    @Body('staff-info') info: StaffInfoCreateDto
  ) {
    return this.staffInfoService.create({
      name: info.name,
      about: info.about,
      contact_email: info.contact_email,
      contact_phone: info.contact_phone,
      contact_mobile: info.contact_mobile,
      contact_fax: info.contact_fax,
      focus_area: info.focus_area,
      office_room: info.office_room,
      office_building: info.office_building,
      office_location: info.office_location,
      picture_id: info.picture_id
    });
  }
  @Get('staff/:id')
  async staffGet(@Param('id') id: number) {
    return this.staffInfoService.findOne({id});
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
