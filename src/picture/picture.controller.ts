import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Picture } from './models/picture.entity';
import { PictureService } from './picture.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';

@Controller('pictures')
export class PictureController {
  constructor(
    private pictureService: PictureService
  ) {}

  @Get()
  async all() {
    return await this.pictureService.all();
  }

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
  uploadFile(@UploadedFile() file, @Body() body) {

    return this.pictureService.create({
        altText: body.altText,
        image_ref: `http://localhost:8000/api/pictures/${file.path}`
      });
  }

  @Get('uploads/:path')
  async getImage(
    @Param('path') path,
    @Res() res: Response
  ) {
    res.sendFile(path, {root: 'uploads'});
  }
}
