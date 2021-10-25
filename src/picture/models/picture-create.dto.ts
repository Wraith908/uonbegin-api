import { IsNotEmpty } from 'class-validator';

export class PictureCreateDto {
  @IsNotEmpty()
  pictureURL: string;

  @IsNotEmpty()
  picture_name: string;

  alt_text: string;

  @IsNotEmpty()
  isStaff: boolean;
}
