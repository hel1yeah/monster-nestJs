import { Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articlesService: ArticleService) {}
  @Post()
  createArticle() {
    return this.articlesService.createArticle();
  }
}
