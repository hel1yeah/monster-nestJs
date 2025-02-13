import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModule } from '@app/tag/tag.module';
import { TagTestModule } from '@app/tagTest/tag.module';
import { UserModule } from '@app/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '@app/ormconfig';
import AuthMiddlewares from './user/middlewares/auth.middlewares';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), TagModule, UserModule, TagTestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddlewares).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
