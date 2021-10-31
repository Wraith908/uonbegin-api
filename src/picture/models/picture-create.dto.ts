import { IsNotEmpty } from 'class-validator';

export class PictureCreateDto {  
  @IsNotEmpty()
  picture_name: string;

  alt_text: string;
}
