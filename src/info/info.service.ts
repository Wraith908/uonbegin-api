import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Info } from './models/info.entity';
import { Equal, Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';

@Injectable()
export class InfoService extends AbstractService {
  constructor(
    @InjectRepository(Info) private readonly infoRepository: Repository<Info>
  ) {
    super(infoRepository);
  }

  async paginate(page: number = 1, relations: any[] = []): Promise<{data: any[], meta: {total: number, page: number, last_page: number}}> {
    const {data, meta} = await super.paginate(page, relations);

    return {
      data: data.map((info: Info) => ({
        id: info.id,
        title: info.title,
        body: info.body,
        section_id: info.section_id,
        image_url: info.image_url
      })),
      meta
    }
  }

  async paginateFilterBySection(section: number,page: number = 1, relations: any[] = []): Promise<{data: any[], meta: {total: number, page: number, last_page: number}}> {
    //Allowing for pagination functionality in the future
    const take = 20;

    const [data, total] = await this.repository.findAndCount({
      take,
      skip: (page - 1) * take,
      relations,
      order: {title: "ASC"},
      where: [
        { section_id: Equal(`${section}`) }
      ]
    });

    return {
      data: data.map((info: Info) => ({
        id: info.id,
        title: info.title,
        body: info.body,
        section_id: info.section_id,
        image_url: info.image_url
      })),
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take)
      }
    };
  }
}
