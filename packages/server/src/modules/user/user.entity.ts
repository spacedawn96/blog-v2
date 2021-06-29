import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
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
  id: number;

  @Column({ length: 300 })
  name: string;

  @Exclude()
  @Column({ length: 300 })
  password: string;

  @Column({ length: 300, default: null })
  bio: string;

  @Column({ length: 300, default: null })
  email: string;

  @Column('simple-enum', { enum: ['admin', 'users'], default: 'users' })
  role: string;

  @Column('simple-enum', { enum: ['locked', 'active'], default: 'active' })
  status: string;

  @CreateDateColumn({
    type: 'datetime',
    comment: 'foundation time',
    name: 'create_at',
  })
  createAt: Date;

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
