import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Picture } from '../../picture/models/picture.entity';

@Entity('staff-info')
export class StaffInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  professorName: String;

  //This may need to be an array, worth considering
  @Column()
  position: String;

  @Column()
  focusArea: String;

  //Office details
  @Column()
  room: String;

  @Column()
  building: String;

  @Column()
  location: String;

  //This is stored as a filepath
  @Column()
  picture: String;

  @Column()
  altText: String;
}
