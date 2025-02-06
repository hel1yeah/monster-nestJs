import { Controller, Get } from '@nestjs/common';

@Controller('tags')
export class TagController {
  @Get()
  getAllTags(): string[] {
    return ['one', 'two', 'three'];
  }
}
