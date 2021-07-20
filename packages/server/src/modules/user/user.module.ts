import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ConfigModule, forwardRef(() => AuthModule)],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
