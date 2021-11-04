import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { StaffInfo } from './models/staff-info.entity';
import { StaffInfoCreateDto } from './models/staff-info-create.dto';
import { StaffInfoUpdateDto } from './models/staff-info-update.dto';
import { StaffInfoService } from './staff-info.service';
import { Response } from 'express';
import { Request } from 'express';

@Controller('staff')
export class InfoController {
  constructor(private staffInfoService: StaffInfoService){}
  //Staff info stuff
  @Get('')
  async allStaff(@Query('page') page: number = 1) {
    return await this.staffInfoService.paginate(page,['picture']);
  }

  @Get(':id')
  async staffGet(@Param('id') id: number) {
    return this.staffInfoService.findOne({id});
  }

   @Post('')
   async createStaffInfo(
     @Body() info: StaffInfoCreateDto
   ) {

     const { picture_id, ...data} = info;

     return this.staffInfoService.create({
       ...data,
       picture: {picture_id: picture_id || null}
     });
   }

   @Put(':id')
   async staffUpdate(
     @Param('id') id: number,
     @Body() body: StaffInfoUpdateDto
   ) {
     await this.staffInfoService.update(id, body);

     return this.staffInfoService.findOne({id});
   }

   @Delete(':id')
   async staffDelete(@Param('id') id: number) {
    return this.staffInfoService.delete(id);
   }
}
