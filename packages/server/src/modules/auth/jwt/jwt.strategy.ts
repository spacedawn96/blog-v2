import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../user/user.entity';
import { AuthService } from '../auth.service';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "12345",
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
