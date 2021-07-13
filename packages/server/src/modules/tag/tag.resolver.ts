import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { TagService } from './tag.service';
import { Tag } from './tag.entity';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import {
  Resolver,
  Mutation,
  Query,
  Args,
  Directive,
  Context,
  Int,
} from '@nestjs/graphql';
import { CreateTagRequest } from './dto/createTag.dto';
import { FindTagRequest } from './dto/findTag.dto';

@Resolver(of => Tag)
@UseGuards(RolesGuard)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation(() => Tag)
  createTag(@Args('input') tag: CreateTagRequest): Promise<Tag> {
    return this.tagService.create(tag);
  }

  @Query(() => [Tag])
  findAllTag(@Args('input') article: FindTagRequest): Promise<Tag[]> {
    return this.tagService.findAll(article);
  }

  @Query(() => [Tag])
  findByIdTag(@Args('id', { type: () => Int }) id: number) {
    return this.tagService.findById(id);
  }

  @Query(() => [Tag])
  getArticleByIdTag(@Args('id', { type: () => Int }) id: number, tag: FindTagRequest) {
    return this.tagService.getArticleById(id, tag);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Tag)
  updateByIdTag(@Args('id', { type: () => Int }) id: number, tag: FindTagRequest) {
    return this.tagService.updateById(id, tag);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Tag)
  deleteByIdTag(@Args('id', { type: () => Int }) id: number) {
    return this.tagService.deleteById(id);
  }
}
