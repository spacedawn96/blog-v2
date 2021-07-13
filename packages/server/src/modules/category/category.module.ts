import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CategoryResolver } from './category.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Category]), AuthModule],
  exports: [CategoryService],
  providers: [CategoryService, CategoryResolver],
})
export class CategoryModule {}
