import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { PostContent } from '../postContent/postContent.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  @Column()
  value: string;

  @OneToMany(() => PostContent, content => content.category)
  contents: Array<PostContent>;

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
