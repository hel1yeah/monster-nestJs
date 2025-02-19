import { UserEntity } from '@app/user/user.entity';
import { Injectable } from '@nestjs/common';
import { ArticleEntity } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/createArticle.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}
  createArticle(
    currentUser: UserEntity,
    articleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    Object.assign(article, articleDto);

    if (!article.tagList) {
      article.tagList = [];
    }

    article.slug = article.title
      .toLowerCase()
      .split(' ')
      .join('-')
      .replace(/[^\w-]+/g, '');

    article.author = currentUser;
    return this.articleRepository.save(article);
  }
}
