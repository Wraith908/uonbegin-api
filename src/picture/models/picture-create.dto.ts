import { IsNotEmpty } from 'class-validator';

export class PictureCreateDto {
  @IsNotEmpty()
  image_ref: string;
}
