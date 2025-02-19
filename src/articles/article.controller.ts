import { Controller, Post, Get, UseGuards, Body, Query, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { User } from '@app/user/decorators/user.decorators';
import { UserEntity } from '@app/user/user.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleResponseInterface } from './types/articleResponse.interface';
import { log } from 'console';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articlesService: ArticleService) {}

  @Get(':slug')
  async getSingleArticle(@Param('slug') slag: string): Promise<ArticleResponseInterface> {
    const article = await this.articlesService.getArticleBySlug(slag);
    return this.articlesService.buildArticleResponse(article);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createArticle(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articlesService.createArticle(
      currentUser,
      createArticleDto,
    );
    return this.articlesService.buildArticleResponse(article);
  }
}
