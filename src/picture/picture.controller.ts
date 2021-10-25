import { Controller } from '@nestjs/common';
import { Picture } from './models/picture.entity';
import { PictureService } from './picture.service';


@Controller('picture')
export class PictureController {
  constructor(
    private pictureService: PictureService
  ) {
    //Post calls
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
    async createPicture(
      @Body('info') info: Body,
      @UploadedFile() file: File
    ) {
      return this.infoService.create({
        picture_name: info.picture_name,
        alt_text: info.alt_text,
        isStaff: info.isStaff,
        pictureURL: `http://localhost:8000/api/pictures/${file.path}`
      })
    }

    //Getters
    @Get()
    async all(@Query('page') page: number = 1) {
      return await this.pictureService.paginate(page, ['picture']);
    }
    @Get(':id')
    async get(@Param('id') id: number) {
      return this.pictureService.findOne({id});
    }

    //Update
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body() body: InfoUpdateDto
    ) {
      await this.pictureService.update(id, body);

      return this.pictureService.findOne({id});
   }

   //Delete
   @Delete(':id')
   async delete(@Param('id') id: number) {
     return this.infoService.delete(id);
   }

  }
}
