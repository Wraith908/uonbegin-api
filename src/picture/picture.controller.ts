import { Controller } from '@nestjs/common';
import { Picture } from './models/picture.entity';
import { PictureService } from './picture.service';


@Controller('picture')
export class PictureController {
  constructor(
    private pictureService: PictureService
  ) {
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

   //
   @Delete(':id')
   async delete(@Param('id') id: number) {
     return this.infoService.delete(id);
   }

  }
}
