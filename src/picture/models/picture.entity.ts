import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('picture')
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  //This should provide an easier way to find photos
  @Column()
  picture_name: string;

  @Column({unique: true})
  pictureURL: string;

  @Column({length: 30})
  alt_text: string;

  @Column()
  isStaff: boolean;
}
