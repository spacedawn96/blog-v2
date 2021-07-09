import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../user/user.entity';
import { AuthService } from '../auth.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_OR_KEY,
    });
  }

  async validate(payload: User) {
    const user = await this.authService.validateUser(payload);

    if (!user) {
      throw new UnauthorizedException('something went to wrong');
    }
    return user;
  }
}
