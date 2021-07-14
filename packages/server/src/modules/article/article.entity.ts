import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Tag } from '../tag/tag.entity';
import { Category } from '../category/category.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(type => String)
  @Column()
  title: string;

  @Field(type => String)
  @Column({ default: null })
  cover: string;

  @Field(type => String)
  @Column({ type: 'text', default: null })
  summary: string;

  @Field(type => String)
  @Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' })
  content: string;

  @Field(type => String)
  @Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' })
  html: string;

  @Field(type => String)
  @Column({ type: 'mediumtext', default: null })
  toc: string;

  @Field(type => String)
  @Column('simple-enum', { enum: ['draft', 'publish'] })
  status?: string;

  @Field(type => String)
  @Column({ type: 'int', default: 0 })
  views?: number;

  @Field(type => Int)
  @Column({ type: 'int', default: 0 })
  likes?: number;

  @Field(type => Boolean)
  @Column({ type: 'boolean', default: false })
  isRecommended?: boolean;

  @Field(type => String)
  @Column({ type: 'text', default: null, select: false })
  password?: string;

  @Field(type => Boolean)
  @Column({ type: 'boolean', default: false })
  needPassword?: boolean;

  @Field(type => Boolean)
  @Column({ type: 'boolean', default: true })
  isCommentable?: boolean;

  @Field(type => String)
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publishAt?: Date;

  @Field(type => Category)
  @ManyToOne(() => Category, category => category.articles, { cascade: true })
  @JoinTable()
  category?: Category;

  @Field(type => [Tag])
  @ManyToMany(() => Tag, tag => tag.articles, { cascade: true })
  @JoinTable()
  tags?: Tag[];

  @CreateDateColumn({
    type: 'datetime',
    comment: 'create_time',
    name: 'create_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: 'update_time',
    name: 'update_at',
  })
  updateAt: Date;
}
