import { AutoMap } from '@automapper/classes';

export class GetUserResponseDto {
  @AutoMap()
  public id: number;

  @AutoMap()
  public name: string;
}
