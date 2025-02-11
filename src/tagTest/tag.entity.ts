import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tagsTests' })
export class TagTestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
