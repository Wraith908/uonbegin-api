import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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
  section_id: number;
  //Uni Service = 1
  //Survival Pack = 2
  //Uni Expectations = 3
  //FAQS and Testimonials = 4
  //University Places = 5

  @OneToOne(() => Picture)
  @JoinColumn({ referencedColumnName: "picture_id" })
  picture: Picture;
}
