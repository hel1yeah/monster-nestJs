import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService<T> {
  getAllTags(): T[] {
    return ['dragon', 'unicorn', 'three', 'coffee'] as T[];
  }
}
