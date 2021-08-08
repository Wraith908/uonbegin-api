import { Module } from '@nestjs/common';
import { Picture } from './models/picture.entity';
import { PictureService } from './picture.service';
import { PictureController } from './picture.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Picture])
  ],
  controllers: [PictureController],
  providers: [PictureService],
  exports: [PictureService]
})
export class PictureModule {}
