import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from "express";
import { Picture } from "./models/picture.entity";
import { PictureService } from "./picture.service";
import { PictureCreateDto } from "./models/picture-create.dto";
import { PictureUpdateDto } from "./models/picture-update.dto";


@Controller('picture')
export class PictureController {
  constructor(private pictureService: PictureService) {}
    //Post calls
    @Post('upload')
    @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename(_, file, callback) {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        return callback(null,`${randomName}${extname(file.originalname)}`);
      }
    })
  }))
    uploadFile(
      @UploadedFile() file,
      @Body() info: PictureCreateDto
    ) {
      return this.pictureService.create({
        picture_name: info.picture_name,
        alt_text: info.alt_text,
        pictureURL: `http://localhost:8000/api/picture/${file.path}`
      })
    }

    //Getters
    @Get()
    async all(@Query('page') page: number = 1) {
      return await this.pictureService.paginate(page);
    }
    @Get(':id')
    async get(@Param('id') id: number) {
      return this.pictureService.findOne({picture_id: id});
    }

    //Update
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() body: Body
    ) {
      await this.pictureService.update(id, body);

      return this.pictureService.findOne({id});
   }

   //Delete
   @Delete(':id')
   async delete(@Param('id') id: number) {
     return this.pictureService.delete(id);
   }

   //This sends back the picture
   @Get('uploads/:path')
    async getImage(
        @Param('path') path,
        @Res() res: Response
    ) {
        res.sendFile(path, {root: 'uploads'});
  }
}
