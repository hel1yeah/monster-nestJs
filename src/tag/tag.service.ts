import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService<T> {
  getAllTags(): T[] {
    return ['dragon', 'unicossssssrn', 'three', 'coffee'] as T[];
  }
}
