import { AutoMap } from '@automapper/classes';
import { IsNumber } from 'class-validator';

export class BookBorrowingResponseDto {
  @AutoMap()
  public id: number;

  @AutoMap()
  public isReturned: boolean;

  @AutoMap()
  public borrowedAt: Date;

  @AutoMap()
  public userId: number;

  @AutoMap()
  public bookId: number;
}

export class BookBorrowingDto {
  @AutoMap()
  @IsNumber()
  public id: number;

  @AutoMap()
  public isReturned: boolean;
}

export class BookBorrowingHistoryDto extends BookBorrowingDto {
  @AutoMap()
  public score: number;
}
