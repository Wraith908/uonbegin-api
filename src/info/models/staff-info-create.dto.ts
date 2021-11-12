import { IsNotEmpty } from 'class-validator';
//import { Picture } from '../../picture/models/picture.entity';

export class StaffInfoCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  about: string;

  @IsNotEmpty()
  contact_email: string;

  @IsNotEmpty()
  contact_phone: string;

  @IsNotEmpty()
  contact_mobile: string;

  @IsNotEmpty()
  contact_fax: string;

  @IsNotEmpty()
  focus_area: string;

  @IsNotEmpty()
  office_room: string;

  @IsNotEmpty()
  office_building: string;

  @IsNotEmpty()
  office_location: string;
}
