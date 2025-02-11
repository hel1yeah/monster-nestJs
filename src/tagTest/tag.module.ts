import { Module } from '@nestjs/common';
import { TagTestController } from '@app/tagTest/tag.controller';
import { TagTestService } from '@app/tagTest/tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagTestEntity } from '@app/tagTest/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagTestEntity])],
  controllers: [TagTestController],
  providers: [TagTestService],
})
export class TagTestModule {}
