import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  Post,
  Delete,
  Patch,
  Param,
  Query,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { PostContentService } from './postContent.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { PostContent } from './postContent.entity';

@Controller('postContent')
@UseGuards(RolesGuard)
export class PostContentController {
  constructor(
    private readonly postContentService: PostContentService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  create(@Body() postContent) {
    return this.postContentService.create(postContent);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() queryParams) {
    return this.postContentService.findAll(queryParams);
  }

  @Get('/category/:id')
  @HttpCode(HttpStatus.OK)
  findpostContentsByCategory(@Param('id') category, @Query() queryParams) {
    return this.postContentService.findPostContentsByCategory(category, queryParams);
  }

  @Get('/tag/:id')
  @HttpCode(HttpStatus.OK)
  findpostContentsByTag(@Param('id') tag, @Query() queryParams) {
    return this.postContentService.findPostContentsByTag(tag, queryParams);
  }

  @Get('/all/recommend')
  @HttpCode(HttpStatus.OK)
  getRecommendpostContents() {
    return this.postContentService.getRecommendPostContents();
  }

  @Get('/archives')
  @HttpCode(HttpStatus.OK)
  getArchives(): Promise<{ [key: string]: PostContent[] }> {
    return this.postContentService.getArchives();
  }

  @Get('/recommend')
  @HttpCode(HttpStatus.OK)
  recommend(@Query('postContentId') postContentId) {
    return this.postContentService.recommend(postContentId);
  }

  @Get(':id')
  async findById(@Request() req, @Param('id') id, @Query('status') status) {
    let token = req.headers.authorization;

    if (/Bearer/.test(token)) {
      token = token.split(' ').pop();
    }

    try {
      const tokenUser = this.jwtService.decode(token) as User;
      const userId = tokenUser.id;
      const exist = await this.userService.findById(userId);
      const isAdmin = userId && exist.role === 'admin';
      return this.postContentService.findById(id, status, isAdmin);
    } catch (e) {
      return this.postContentService.findById(id, status);
    }
  }

  @Post(':id/checkPassword')
  @HttpCode(HttpStatus.OK)
  checkPassword(@Param('id') id, @Body() postContent) {
    return this.postContentService.checkPassword(id, postContent);
  }

  @Post(':id/views')
  @HttpCode(HttpStatus.OK)
  updateViewsById(@Param('id') id) {
    return this.postContentService.updateViewsById(id);
  }

  @Post(':id/likes')
  @HttpCode(HttpStatus.OK)
  updateLikesById(@Param('id') id, @Body('type') type) {
    return this.postContentService.updateLikesById(id, type);
  }

  @Patch(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  updateById(@Param('id') id, @Body() postContent) {
    return this.postContentService.updateById(id, postContent);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  deleteById(@Param('id') id) {
    return this.postContentService.deleteById(id);
  }
}
