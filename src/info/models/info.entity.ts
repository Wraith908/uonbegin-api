import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Picture } from '../../picture/models/picture.entity';

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

  @OneToOne(() => Picture)
  @JoinColumn()
  picture: Picture;
}
