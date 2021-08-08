import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('picture')
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  altText: string;

  //This is the filename required to access the images
  @Column()
  image_ref: string;
}
