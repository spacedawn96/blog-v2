import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  Index,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

export enum IsAdminOrUser {
  ADMIN = 'admin',
  USERS = 'users',
}

export enum IsActiveOrLocked {
  LOCKED = 'locked',
  ACTIVE = 'active',
}

@ObjectType()
@Entity('USER')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(type => String)
  @Column({ length: 300 })
  name: string;

  @Field(type => String)
  @Exclude()
  @Column({ length: 300 })
  password: string;

  @Field(type => String)
  @Column({ length: 300, default: null })
  bio: string;

  @Field(type => String)
  @Index()
  @IsEmail()
  @Column({ length: 300, default: null })
  email: string;

  @Field(type => Boolean)
  @Column({ default: false })
  email_verified!: boolean;

  @Field(type => Int)
  @Column('int', { default: 0 })
  tokenVersion!: number;

  @Field(type => IsAdminOrUser)
  @Column({ type: 'enum', enum: IsAdminOrUser, default: IsAdminOrUser.USERS })
  role: IsAdminOrUser;

  @Field(type => IsActiveOrLocked)
  @Column({ type: 'enum', enum: IsActiveOrLocked, default: IsActiveOrLocked.ACTIVE })
  status: IsActiveOrLocked;

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

  static async comparePassword(PreEncryptionPassword, EncryptedPassword) {
    return bcrypt.compareSync(PreEncryptionPassword, EncryptedPassword);
  }

  static encryptPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  @BeforeInsert()
  encrypt() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
