import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { StaffInfo } from './models/staff-info.entity';
import { StaffInfoCreateDto } from './models/staff-info-create.dto';
import { StaffInfoUpdateDto } from './models/staff-info-update.dto';
import { StaffInfoService } from './staff-info.service';
import { Response } from 'express';
import { Request } from 'express';
import { AuthGuard } from '../auth/auth.guard';

@Controller('staff')
export class StaffController {
  constructor(private staffInfoService: StaffInfoService){}
  //Staff info stuff
  @Get('')
  async geStaff(@Query('page') page: number = 1) {
    return await this.staffInfoService.paginate(page);
  }

  @Get('search')
  async searchStaff(
    @Query('page') page: number = 1,
    @Query('search') search: string = ''
  ) {
    return await this.staffInfoService.paginateFilterByName(search,page,[]);
  }

  @Get(':id')
  async staffGet(@Param('id') id: number) {
    return this.staffInfoService.findOne({id});
  }

  @UseGuards(AuthGuard)
   @Post()
   async createStaffInfo(@Body() staffInfo: StaffInfoCreateDto): Promise<StaffInfo> {
     return this.staffInfoService.create({
       name: staffInfo.name,
       about: staffInfo.about,
       contact_email: staffInfo.contact_email,
       contact_phone: staffInfo.contact_phone,
       contact_mobile: staffInfo.contact_mobile,
       contact_fax: staffInfo.contact_fax,
       focus_area: staffInfo.focus_area,
       office_room: staffInfo.office_room,
       office_building: staffInfo.office_building,
       office_location: staffInfo.office_location,
       image_url: staffInfo.image_url
     });
   }

   @UseGuards(AuthGuard)
   @Put(':id')
   async staffUpdate(
     @Param('id') id: number,
     @Body() body: StaffInfoUpdateDto
   ) {
     await this.staffInfoService.update(id, {
       name: body.name,
       about: body.about,
       contact_email: body.contact_email,
       contact_phone: body.contact_phone,
       contact_mobile: body.contact_mobile,
       contact_fax: body.contact_fax,
       focus_area: body.focus_area,
       office_room: body.office_room,
       office_builing: body.office_building,
       office_location: body.office_location,
       image_url: body.image_url
     });

     return this.staffInfoService.findOne({id});
   }

   @UseGuards(AuthGuard)
   @Delete(':id')
   async staffDelete(@Param('id') id: number) {
    return this.staffInfoService.delete(id);
   }
}
