import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService<string>) {}
  @Get()
  getAllTags(): string[] {
    return this.tagService.getAllTags();
  }
}
