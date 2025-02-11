import { Controller, Get } from '@nestjs/common';
import { TagTestService } from '@app/tagTest/tag.service';

@Controller('tags')
export class TagTestController {
  constructor(private readonly tagTestService: TagTestService) {}

  @Get()
  async getAllTags(): Promise<{ tags: string[] }> {
    const tags = await this.tagTestService.getAllTags();
    return {
      tags: tags.map((tag) => tag.name),
    };
  }
}
