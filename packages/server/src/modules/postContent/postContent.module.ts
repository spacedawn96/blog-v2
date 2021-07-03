import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { TagModule } from '../tag/tag.module';
import { CategoryModule } from '../category/category.module';
import { PostContent } from './postContent.entity';
import { PostContentService } from './postContent.service';
import { PostContentController } from './postContent.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostContent]),
    CategoryModule,
    TagModule,
    UserModule,
    AuthModule,
  ],
  exports: [PostContentService],
  providers: [PostContentService],
  controllers: [PostContentController],
})
export class PostContentModule {}
