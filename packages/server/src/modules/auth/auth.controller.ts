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
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { Roles } from './roles.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user) {
    const res = await this.authService.login(user);
    return res;
  }

  @Post('admin')
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  createBook() {
    return this.authService.checkAdmin();
  }
}
