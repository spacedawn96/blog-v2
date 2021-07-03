import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/user.entity';
import { Category } from './modules/category/category.entity';
import { Tag } from './modules/tag/tag.entity';
import { PostContent } from './modules/postContent/postContent.entity';
import { TagModule } from './modules/tag/tag.module';
import { CategoryModule } from './modules/category/category.module';
import { PostContentModule } from './modules/postContent/postContent.module';

// const { file: envFilePath } = require('../../../config/env');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        entities: [User, Category, Tag, PostContent],
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USER', 'root'),
        password: configService.get('DB_PASSWD', '1245'),
        database: configService.get('DB_DATABASE', 'blog'),
        // url: process.env.CLEARDB_DATABASE_URL,
        charset: 'utf8mb4',
        timezone: '+08:00',
        synchronize: true,
      }),
    }),
    UserModule,
    PostContentModule,
    TagModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
