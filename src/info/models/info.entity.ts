import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @Column()
  pictureURL: string;
}
