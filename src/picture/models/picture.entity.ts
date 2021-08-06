import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('picture')
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  altText: string;

  //This is either a file name or a link of some description so
  //that we can keep track of what images belong where
  @Column()
  image_ref: string;
}
