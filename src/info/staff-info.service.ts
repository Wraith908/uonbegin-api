import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffInfo } from './models/staff-info.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';

@Injectable()
export class StaffInfoService extends AbstractService {
  constructor(
    @InjectRepository(Info) private readonly staff/infoRepository: Repository<StaffInfo>
  ) {
    super(staffInfoRepository);
  }
}
