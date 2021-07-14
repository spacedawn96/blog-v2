import { Controller, Param, Body, UseGuards } from '@nestjs/common';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CreateCategoryRequest } from './dto/createCategory.dto';
import { FindCategoryRequest } from './dto/findCategory.dto';
import {
  Resolver,
  Mutation,
  Query,
  Args,
  Directive,
  Context,
  Int,
} from '@nestjs/graphql';

@Resolver(of => Category)
@UseGuards(RolesGuard)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category)
  createCategory(@Args('input') category: CreateCategoryRequest): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Query(() => [Category])
  findAllCategory(@Args() category: FindCategoryRequest): Promise<Category[]> {
    return this.categoryService.findAll(category);
  }

  @Query(() => [Category])
  findByIdCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findById(id);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Category)
  updateByIdCategory(
    @Args('id', { type: () => Int }) id: number,
    category: FindCategoryRequest,
  ) {
    return this.categoryService.updateById(id, category);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Category)
  deleteByIdCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.deleteById(id);
  }
}
