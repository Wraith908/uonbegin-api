import { IsNotEmpty } from 'class-validator';
//import { Picture } from '../../picture/models/picture.entity';

export class InfoCreateDto {
  @IsNotEmpty()
  pictureURL: string;

  alt_text: string;

  @IsNotEmpty()
  isStaff: boolean;
}
