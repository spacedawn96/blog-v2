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

@Entity()
export class User {
  static async comparePassword(PreEncryptionPassword, EncryptedPassword) {
    return bcrypt.compareSync(PreEncryptionPassword, EncryptedPassword);
  }

  static encryptPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 300 })
  name: string;

  @Exclude()
  @Column({ length: 300 })
  password: string;

  @Column({ length: 300, default: null })
  bio: string;

  @Index()
  @Column({ length: 300, default: null })
  email: string;

  @Column({ default: false })
  email_verified!: boolean;

  @Column('int', { default: 0 })
  tokenVersion!: number;

  @Column('simple-enum', { enum: ['admin', 'users'], default: 'users' })
  role: string;

  @Column('simple-enum', { enum: ['locked', 'active'], default: 'active' })
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

  @BeforeInsert()
  encrypt() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
