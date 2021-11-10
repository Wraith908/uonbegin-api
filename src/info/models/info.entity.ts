import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('info')
export class Info {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true, default: ""})
  title: string;

  @Column({length: 2000})
  body: string;

  @Column()
  section_id: number;
  //Uni Service = 1
  //Survival Pack = 2
  //Uni Expectations = 3
  //FAQS and Testimonials = 4
  //University Places = 5

  @Column({nullable: true})
  image_url: string;
}
