import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffInfo } from './models/staff-info.entity';
import { Like, Repository } from 'typeorm';
import { AbstractService } from '../common/abstract.service';

@Injectable()
export class StaffInfoService extends AbstractService {
  constructor(
    @InjectRepository(StaffInfo) private readonly staffInfoRepository: Repository<StaffInfo>
  ) {
    super(staffInfoRepository);
  }

  async paginate(page: number = 1, relations: any[] = []): Promise<{data: any[], meta: {total: number, page: number, last_page: number}}> {
    const {data, meta} = await super.paginate(page, relations);

    return {
      data: data.map((staffInfo: StaffInfo) => ({
        id: staffInfo.id,
        name: staffInfo.name,
        about: staffInfo.about,
        contact_email: staffInfo.contact_email,
        contact_phone: staffInfo.contact_phone,
        contact_mobile: staffInfo.contact_mobile,
        contact_fax: staffInfo.contact_fax,
        focus_area: staffInfo.focus_area,
        office_room: staffInfo.office_room,
        office_building: staffInfo.office_building,
        office_location: staffInfo.office_location
      })),
      meta
    }
  }

  async paginateFilterByName(search: string,page: number = 1, relations: any[] = []): Promise<{data: any[], meta: {total: number, page: number, last_page: number}}> {

    const take = 15;

    const [data, total] = await this.repository.findAndCount({
      take,
      skip: (page - 1) * take,
      relations,
      order: {name: "ASC"},
      where: [
        { name: Like(`%${search}%`) }
      ]
    });

    return {
      data: data.map((staffInfo: StaffInfo) => ({
        id: staffInfo.id,
        name: staffInfo.name,
        about: staffInfo.about,
        contact_email: staffInfo.contact_email,
        contact_phone: staffInfo.contact_phone,
        contact_mobile: staffInfo.contact_mobile,
        contact_fax: staffInfo.contact_fax,
        focus_area: staffInfo.focus_area,
        office_room: staffInfo.office_room,
        office_building: staffInfo.office_building,
        office_location: staffInfo.office_location
      })),
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take)
      }
    };
  }
}
