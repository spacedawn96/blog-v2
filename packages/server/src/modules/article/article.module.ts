import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { ArticleService } from './article.service';
import { TagModule } from '../tag/tag.module';
import { CategoryModule } from '../category/category.module';
import { Article } from './article.entity';
import { ArticleResolver } from './article.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    CategoryModule,
    TagModule,
    UserModule,
    AuthModule,
  ],
  exports: [ArticleService],
  providers: [ArticleService, ArticleResolver],
})
export class ArticleModule {}
