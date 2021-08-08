import { forwardRef, Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';
import { PictureModule } from '../picture/picture.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Info } from './models/info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Info]),
    forwardRef(() => PictureModule)
  ],
  controllers: [InfoController],
  providers: [InfoService],
  exports: [InfoService]
})
export class InfoModule {}
