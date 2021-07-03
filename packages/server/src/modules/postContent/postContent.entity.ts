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

@Entity()
export class PostContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: null })
  cover: string;

  @Column({ type: 'text', default: null })
  summary: string;

  @Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' })
  content: string;

  @Column({ type: 'mediumtext', default: null, charset: 'utf8mb4' })
  html: string;

  @Column({ type: 'text', default: null, select: false })
  password: string;

  @ManyToOne(() => Category, category => category.contents, { cascade: true })
  @JoinTable()
  category: Category;

  @ManyToMany(() => Tag, tag => tag.contents, { cascade: true })
  @JoinTable()
  tags: Array<Tag>;

  @Column('simple-enum', { enum: ['draft', 'publish'] })
  status: string;

  @Column({ type: 'int', default: 0 })
  views: number;

  @Column({ type: 'int', default: 0 })
  likes: number;

  @Column({ type: 'boolean', default: true })
  isCommentable: boolean;

  @Column({ type: 'boolean', default: false })
  needPassword: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  publishAt: Date;

  @CreateDateColumn({
    type: 'datetime',
    comment: 'create_time',
    name: 'create_at',
  })
  createAt: Date;

  @UpdateDateColumn({
    type: 'datetime',
    comment: 'upate_time',
    name: 'update_at',
  })
  updateAt: Date;
}
