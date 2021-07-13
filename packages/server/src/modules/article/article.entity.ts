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
  id?: string;

  @Field(type => String)
  @Column()
  title?: string;

  @Field(type => String)
  @Column({ default: null })
  cover?: string;

  @Field(type => String)
  @Column({ type: 'text', default: null })
  summary?: string;

  @Field(type => String)
  @Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' })
  content?: string;

  @Field(type => String)
  @Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' })
  html?: string;

  @Field(type => String)
  @Column({ type: 'mediumtext', default: null })
  toc?: string;

  @Field(type => [Category], { nullable: true })
  @ManyToOne(() => Category, category => category.articles, { cascade: true })
  @JoinTable()
  category?: Category;

  @Field(type => [Tag], { nullable: true })
  @ManyToMany(() => Tag, tag => tag.articles, { cascade: true })
  @JoinTable()
  tags?: Tag[];

  @Column('simple-enum', { enum: ['draft', 'publish'] })
  status?: string;

  @Column({ type: 'int', default: 0 })
  views?: number;

  @Column({ type: 'int', default: 0 })
  likes?: number;

  @Column({ type: 'boolean', default: false })
  isRecommended?: boolean;

  @Column({ type: 'text', default: null, select: false })
  password?: string;

  @Column({ type: 'boolean', default: false })
  needPassword?: boolean;

  @Column({ type: 'boolean', default: true })
  isCommentable?: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publishAt?: Date;

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
