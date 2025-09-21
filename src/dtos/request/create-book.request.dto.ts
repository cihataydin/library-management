import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookRequestDto {
  @ApiProperty()
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public name: string;
}
