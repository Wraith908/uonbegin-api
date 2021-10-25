import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StaffInfo } from './models/staff-info.entity';
import { Repository } from 'typeorm';
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
        name: staffInfo.title,
        about: staffInfo.body,
        contact_email: staffInfo.section,
        contact_phone: staffInfo.picture,
        contact_mobile: staffInfo.contact_mobile,
        contact_fax: staffInfo.contact_fax,
        focus_area: staffInfo.focus_area,
        office_room: staffInfo.office_room,
        office_building: staffInfo.office_building,
        office_location: staffInfo.office_location,
        picture: staffInfo.picture
      })),
      meta
    }
  }
}
