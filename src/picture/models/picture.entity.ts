import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('picture')
export class Picture {
  @PrimaryGeneratedColumn()
  picture_id: number;

  //This should provide an easier way to find photos
  @Column({unique: true})
  pictureURL: string;

  @Column()
  picture_name: string;

  @Column({length: 30})
  alt_text: string;

  @Column()
  isStaff: boolean;
}
