import { IsNotEmpty } from 'class-validator';
//import { Picture } from '../../picture/models/picture.entity';

export class InfoCreateDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  section_id: number;

  picture_id: string;
}
