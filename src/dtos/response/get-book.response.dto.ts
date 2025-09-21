import { AutoMap } from '@automapper/classes';
import { IsNumber } from 'class-validator';

export class GetBookResponseDto {
  @IsNumber()
  @AutoMap()
  public id: number;

  @AutoMap()
  public name: string;

  @AutoMap()
  public averageRating: number;
}

export class GetBookBorrowedResponseDto {
  @IsNumber()
  @AutoMap()
  public id: number;

  @AutoMap()
  public name: string;
}

export class GetBookBorrowedHistoryResponseDto extends GetBookBorrowedResponseDto {
  @AutoMap()
  public score: number;
}
