import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  Request,
  UseGuards,
  UseInterceptors,
  HttpException,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { User } from './user.entity';
import { RolesGuard, Roles } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RegisterResponseDto, RegisterRequestDto } from './dto/register.dto';
import { UpdateUserinfoRequest, UpdatePasswordRequest } from './dto/modifyUserinfo.dto';
import { Resolver, Mutation, Query, Args, Directive } from '@nestjs/graphql';
import { GetUserInfoResponse } from './dto/getUserInfo.dto';
import { User as UserDeocorator, UserToken } from 'src/user.decorator';

@Resolver()
@UseGuards(RolesGuard)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Query(() => GetUserInfoResponse)
  async findAll(): Promise<[User[], number]> {
    const users = await this.userService.findAll();

    return users;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Mutation(() => RegisterResponseDto)
  async register(@Args() user: RegisterRequestDto): Promise<RegisterResponseDto> {
    const saveUser = await this.userService.createUser(user);
    return saveUser;
  }

  async checkPermission(req: { headers: { authorization: any } }, user: Partial<User>) {
    let token = req.headers.authorization;

    if (!token) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    if (/Bearer/.test(token)) {
      token = token.split(' ').pop();
    }
    const tokenUser = this.jwtService.decode(token) as User;
    const id = tokenUser.id;

    if (!id) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
    }

    const exist = await this.userService.findById(id);
    if (exist.id !== user.id && exist.role !== 'admin') {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Mutation(() => GetUserInfoResponse)
  async update(
    @Request() req,
    @Args() user: UpdateUserinfoRequest,
  ): Promise<GetUserInfoResponse> {
    await this.checkPermission(req, user);
    const saveUser = await this.userService.updateById(user.id, user);
    return saveUser;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Mutation(() => GetUserInfoResponse)
  async updatePassword(
    @Request() req,
    @Args() user: UpdatePasswordRequest,
  ): Promise<GetUserInfoResponse> {
    await this.checkPermission(req, user);
    const saveUser = await this.userService.updatePassword(user.id, user);
    return saveUser;
  }
}
