import { IsNotEmpty } from 'class-validator';

export class PictureCreateDto {
  @IsNotEmpty()
  altText: string;
  
  @IsNotEmpty()
  image_ref: string;
}
