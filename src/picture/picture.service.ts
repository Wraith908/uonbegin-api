import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Picture } from './models/picture.entity';
import { Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';

@Injectable()
export class PictureRepository extends AbstractService {
  constructor(
    @InjectRepository(Picture) private readonly pictureRepository: Repository<Picture>
  ) {
    super(pictureRepository);
  }
}
