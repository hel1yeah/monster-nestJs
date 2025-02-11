import { Injectable } from '@nestjs/common';
import { TagTestEntity } from '@app/tagTest/tag.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagTestService {
  constructor(
    @InjectRepository(TagTestEntity)
    private readonly tagRepository: Repository<TagTestEntity>,
  ) {}

  async getAllTags(): Promise<TagTestEntity[]> {
    return await this.tagRepository.find();
  }
}
