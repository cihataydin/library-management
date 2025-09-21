import { Entity, Column, ManyToOne } from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { User } from './user.entity';
import { Book } from './book.entity';
import { BaseEntity } from '@/infra/db';

@Entity()
export class BookBorrowing extends BaseEntity {
  @AutoMap()
  @Column({ default: false })
  public isReturned: boolean;

  @AutoMap()
  @Column({ nullable: true })
  public score: number;

  @AutoMap()
  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  public borrowedAt: Date;

  @AutoMap()
  @Column({ type: 'timestamptz', nullable: true })
  public returnedAt: Date;

  @AutoMap(() => User)
  @ManyToOne(() => User, (user) => user.borrowings)
  public user: User;

  @AutoMap(() => Book)
  @ManyToOne(() => Book, (book) => book.borrowings)
  public book: Book;
}
