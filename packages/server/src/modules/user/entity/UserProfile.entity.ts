import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  Index,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
@Entity()
export class UserProfile {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => String)
  @Column({ default: false })
  bio!: string;

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

  @Field(type => User)
  @OneToOne(type => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @Field(type => String)
  @Column('uuid')
  user_id!: string;
}
