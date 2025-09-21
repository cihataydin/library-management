import { Entity, Column, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BookBorrowing } from './book-borrowing.entity';
import { BaseEntity } from '@/infra/db';

@Entity()
export class User extends BaseEntity {
  @AutoMap()
  @Column()
  public name: string;

  @AutoMap(() => [BookBorrowing])
  @OneToMany(() => BookBorrowing, (bookBorrowing) => bookBorrowing.user)
  public borrowings: BookBorrowing[];
}
