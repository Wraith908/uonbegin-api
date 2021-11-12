import { forwardRef, Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';
import { StaffController } from './staff-info.controller';
import { StaffInfoService } from './staff-info.service';
import { UploadController } from './upload.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Info } from './models/info.entity';
import { StaffInfo } from './models/staff-info.entity';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([Info,StaffInfo])
  ],
  controllers: [InfoController,StaffController, UploadController],
  providers: [InfoService,StaffInfoService],
  exports: [InfoService,StaffInfoService]
})
export class InfoModule {}
