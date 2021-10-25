import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Picture } from "../../picture/models/picture.entity";

@Entity('info')
export class Info {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  title: string;

  @Column({length: 500})
  body: string;

  @Column()
  section: string;

  @ManyToOne(() => Picture)
  @JoinColumn({ referencedColumnName: "picture_id"})
  picture: Picture;
}
