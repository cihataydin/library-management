import { AutoMap } from '@automapper/classes';
import { IsNumber } from 'class-validator';

export class CreateBookResponseDto {
  @IsNumber()
  @AutoMap()
  public id: number;

  @AutoMap()
  public name: string;

  @AutoMap()
  public averageRating: number;
}
