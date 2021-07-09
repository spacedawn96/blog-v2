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
@Entity()
export class User {
  @Field(() => Int, { nullable: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(type => String, { nullable: true })
  @Column({ length: 200 })
  name: string;

  @Field(type => String)
  @Exclude()
  @Column({ length: 200 })
  password: string;

  @Field(type => String)
  @Column({ length: 200, default: null })
  bio: string;

  @Field(type => String)
  @Index()
  @IsEmail()
  @Column({ length: 200, default: null })
  email: string;

  @Field(type => Boolean)
  @Column({ default: false })
  email_verified!: boolean;

  @Field(type => Int)
  @Column('int', { default: 0 })
  tokenVersion!: number;

  @Field(type => String)
  @Column({ type: 'enum', enum: IsAdminOrUser, default: IsAdminOrUser.USERS })
  role: string;

  @Field(type => String)
  @Column({ type: 'enum', enum: IsActiveOrLocked, default: IsActiveOrLocked.ACTIVE })
  status: string;

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
