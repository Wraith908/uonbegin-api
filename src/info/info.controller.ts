import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { Info } from './models/info.entity';
import { StaffInfo } from './models/staff-info.entity';
import { InfoCreateDto } from './models/info-create.dto';
import { InfoUpdateDto } from './models/info-update.dto';
import { InfoService } from './info.service';
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
    return await this.infoService.paginate(page);
  }
  /*
  @Post()
  async create(
    @Body('info') info: InfoCreateDto,
    @Body('pictures') ids: number[]
  ): Promise<Info> {
    return this.infoService.create({
      title: info.title,
      body: info.body,
      section: info.section,
      pictures: ids.map(id => {id})
    });
  } */
  /*
  */
  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename(_, file, callback) {
        //This black magic makes a random name of 32 characters
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return callback(null,`${randomName}${extname(file.originalname)}`);
      }
    })
  }))
  async createStaffInfo(
    @Body('staff-info') info: Body,
    @UploadedFile()
  ) {
    return this.staffInfoService.create({
      professorName: info.professorName,
      position: info.position,
      focusArea: info.focusArea,
      room: info.room,
      building: info.building,
      location: info.location,
      picture: `http://localhost:8000/api/pictures/${file.path}`
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
//}
//
// @Put('removePhoto/:id')
// async removePicture(
// @Body() body: Body
//) {
//
//}
}
