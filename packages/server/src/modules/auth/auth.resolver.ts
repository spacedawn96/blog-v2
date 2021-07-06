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
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { Roles } from './roles.guard';
import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { LoginResponse } from './dto/loginIn.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @Mutation(returns => LoginResponse)
  async login(@Body() user) {
    const res = await this.authService.login(user);
    return res;
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Mutation(returns => LoginResponse)
  createBook() {
    return this.authService.checkAdmin();
  }
}
