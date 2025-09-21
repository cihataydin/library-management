import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRequestDto {
  @ApiProperty({ type: String, required: true })
  @AutoMap()
  @IsString()
  @IsNotEmpty()
  public name: string;
}
