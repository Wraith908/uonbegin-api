import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('picture')
export class Picture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  pictureURL: string;

  @Column({length: 30})
  alt_text: string;

  @Column()
  isStaff: boolean;
}
