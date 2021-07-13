import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/user.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { Article } from './modules/article/article.entity';
import { Category } from './modules/category/category.entity';
import { Tag } from './modules/tag/tag.entity';
import { ArticleModule } from './modules/article/article.module';
import { CategoryModule } from './modules/category/category.module';
import { TagModule } from './modules/tag/tag.module';

// const { file: envFilePath } = require('../../../config/env');

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: [] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        entities: [User, Article, Category, Tag],
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 3306),
        username: configService.get('DB_USER', 'root'),
        password: configService.get('DB_PASSWD', '1245'),
        database: configService.get('DB_DATABASE', 'blog'),
        // url: process.env.CLEARDB_DATABASE_URL,
        charset: 'utf8mb4',
        timezone: '+08:00',
        synchronize: true,
        keepConnectionAlive: true,
      }),
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      context: ({ req }) => ({ headers: req.headers }),
      playground: true,
    }),
    UserModule,
    AuthModule,
    ArticleModule,
    CategoryModule,
    TagModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
