import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { Article } from './article.entity';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { ArticleService } from './article.service';

import { CreateArticleRequest } from './dto/createArticle.dto';
import {
  Resolver,
  Mutation,
  Query,
  Args,
  Directive,
  Context,
  Int,
} from '@nestjs/graphql';

@Resolver(of => Article)
@UseGuards(RolesGuard)
export class ArticleResolver {
  constructor(
    private readonly articleService: ArticleService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Article)
  async createArticle(@Args('input') article: CreateArticleRequest): Promise<Article> {
    const saveArticle = await this.articleService.create(article);

    return saveArticle;
  }

  @HttpCode(HttpStatus.OK)
  @Query(() => [Article])
  findAllArticle() {
    return this.articleService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Query(() => [Article])
  findArticlesByCategoryArticle(@Args('id', { type: () => Int }) category: number) {
    return this.articleService.findArticlesByCategory(category);
  }

  @HttpCode(HttpStatus.OK)
  @Query(() => [Article])
  findArticlesByTagArticle(@Args('id', { type: () => Int }) tag: number) {
    return this.articleService.findArticlesByTag(tag);
  }

  @HttpCode(HttpStatus.OK)
  @Query(() => [Article])
  getRecommendArticlesArticle() {
    return this.articleService.getRecommendArticles();
  }

  @HttpCode(HttpStatus.OK)
  @Query(() => [Article])
  getArchivesArticle(): Promise<{ [key: string]: Article[] }> {
    return this.articleService.getArchives();
  }

  @HttpCode(HttpStatus.OK)
  @Query(() => [Article])
  recommendArticle(@Args('articleId', { type: () => Int }) articleId: number) {
    return this.articleService.recommend(articleId);
  }

  async findByIdArticle(
    @Context() req,
    @Args('id', { type: () => Int }) id: number,
    status,
  ) {
    let token = req.headers.authorization;

    if (/Bearer/.test(token)) {
      token = token.split(' ').pop();
    }

    try {
      const tokenUser = this.jwtService.decode(token) as User;
      const userId = tokenUser.id;
      const exist = await this.userService.findById(userId);
      const isAdmin = userId && exist.role === 'admin';
      return this.articleService.findById(id, status, isAdmin);
    } catch (e) {
      return this.articleService.findById(id, status);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Mutation(() => Article)
  checkPasswordArticle(@Args('id', { type: () => Int }) id: number, article) {
    return this.articleService.checkPassword(id, article);
  }

  @HttpCode(HttpStatus.OK)
  @Mutation(() => Article)
  updateViewsByIdArticle(@Args('id', { type: () => Int }) id: number) {
    return this.articleService.updateViewsById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Mutation(() => Article)
  updateLikesByIdArticle(@Args('id', { type: () => Int }) id: number, type) {
    return this.articleService.updateLikesById(id, type);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Mutation(() => Article)
  updateByIdArticle(@Args('id', { type: () => Int }) id: number, article) {
    return this.articleService.updateById(id, article);
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Article)
  deleteByIdArticle(@Args('id', { type: () => Int }) id: number) {
    return this.articleService.deleteById(id);
  }
}
