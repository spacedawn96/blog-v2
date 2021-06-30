import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Poster {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column({ type: 'text', default: null })
  img: string;

  @CreateDateColumn({
    type: 'datetime',
    comment: 'foundation time',
    name: 'create_at',
  })
  createAt: Date;
}
