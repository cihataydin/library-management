import { Entity, Column, OneToMany } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { BookBorrowing } from './book-borrowing.entity';
import { BaseEntity } from '@/infra/db';

@Entity()
export class Book extends BaseEntity {
  @AutoMap()
  @Column()
  public name: string;

  @AutoMap()
  @Column({ type: 'float', default: 0 })
  public averageRating: number;

  @AutoMap()
  @Column({ type: 'float', default: 0 })
  public totalRatings: number;

  @AutoMap(() => [BookBorrowing])
  @OneToMany(() => BookBorrowing, (bookBorrowing) => bookBorrowing.book)
  public borrowings: BookBorrowing[];
}
