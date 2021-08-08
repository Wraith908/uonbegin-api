import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
//import { Picture } from '../../picture/models/picture.entity';

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

//  @ManyToMany(() => Picture, {cascade: true})
//  @JoinTable({
//    name: 'info_pictures',
//    joinColumn: {name: 'info-id', referencedColumnName: 'id'},
//    inverseJoinColumn: {name: 'picture-id', referencedColumnName: 'id'}
//  })
//  pictures: Picture[];
}
