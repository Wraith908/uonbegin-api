import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff-Info } from './models/staff-info.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';

@Injectable()
export class StaffInfoService extends AbstractService {
  constructor(
    @InjectRepository(StaffInfo) private readonly staffInfoRepository: Repository<StaffInfo>
  ) {
    super(staffInfoRepository);
  }
}