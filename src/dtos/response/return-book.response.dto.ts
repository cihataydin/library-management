import { AutoMap } from '@automapper/classes';

export class ReturnBookResponseDto {
  @AutoMap()
  public id: number;

  @AutoMap()
  public isReturned: boolean;

  @AutoMap()
  public score: number;

  @AutoMap()
  public borrowedAt: Date;

  @AutoMap()
  public returnedAt: Date;

  @AutoMap()
  public userId: number;

  @AutoMap()
  public bookId: number;
}
