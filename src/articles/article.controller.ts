import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { User } from '@app/user/decorators/user.decorators';
import { UserEntity } from '@app/user/user.entity';
import { CreateArticleDto } from './dto/createArticle.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articlesService: ArticleService) {}

  @UseGuards(AuthGuard)
  @Post()
  createArticle(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<any> {
    return this.articlesService.createArticle(currentUser, createArticleDto);
  }
}
