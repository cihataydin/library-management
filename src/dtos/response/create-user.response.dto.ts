import { AutoMap } from '@automapper/classes';

export class CreateUserResponseDto {
  @AutoMap()
  public id: number;

  @AutoMap()
  public name: string;
}
