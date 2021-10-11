import { IsNotEmpty } from 'class-validator';
//import { Picture } from '../../picture/models/picture.entity';

export class InfoCreateDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  section: string;

  pictureURL: string;
}
