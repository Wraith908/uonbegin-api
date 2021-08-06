import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Info } from './models/info.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';

@Injectable()
export class InfoService extends AbstractService {
  constructor(
    @InjectRepository(Info) private readonly infoRepository: Repository<Info>
  ) {
    super(infoRepository);
  }
}
