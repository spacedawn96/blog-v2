import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User {
  static async comparePassword(PreEncryptionPassword, EncryptedPassword) {
    return bcrypt.compareSync(PreEncryptionPassword, EncryptedPassword);
  }

  static encryptPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty()
  @Column({ length: 30 })
  name: string;

  @ApiProperty()
  @Exclude()
  @Column({ length: 30 })
  password: string;

  @ApiProperty()
  @Column({ length: 30, default: null })
  bio: string;

  @ApiProperty()
  @Column({ length: 30, default: null })
  email: string;

  @ApiProperty()
  @Column('simple-enum', { enum: ['admin', 'users'], default: 'users' })
  role: string;

  @ApiProperty()
  @Column('simple-enum', { enum: ['locked', 'active'], default: 'active' })
  status: string;

  @ApiProperty()
  @CreateDateColumn({
    type: 'datetime',
    comment: 'foundation time',
    name: 'create_at',
  })
  createAt: Date;

  @ApiProperty()
  @UpdateDateColumn({
    type: 'datetime',
    comment: 'renewal time',
    name: 'update_at',
  })
  updateAt: Date;

  @BeforeInsert()
  encrypt() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
