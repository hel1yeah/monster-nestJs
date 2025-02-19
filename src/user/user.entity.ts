import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { hash } from 'bcrypt';
import { ArticleEntity } from '../articles/article.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ default: null })
  bio: string;

  @Column({ default: null })
  image: string;

  @Column()
  username: string;

  @Column({ select: false })
  password?: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];
}
