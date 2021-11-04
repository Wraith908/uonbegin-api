import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Picture } from "../../picture/models/picture.entity";

@Entity('staff_info')
export class StaffInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  name: string;

  @Column({length: 500})
  about: string;

  @Column()
  contact_email: string;

  @Column()
  contact_phone: string;

  @Column()
  contact_mobile: string;

  @Column()
  contact_fax: string;

  @Column()
  focus_area: string;

  @Column()
  office_room: string;

  @Column()
  office_building: string;

  @Column()
  office_location: string;

  @ManyToOne(() => Picture, {nullable: true})
  @JoinColumn({ referencedColumnName: "picture_id"})
  picture: Picture;
}
