import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Min, Max, IsInt } from 'class-validator';

export class ReturnBookRequestDto {
  @ApiProperty({ type: Number, required: true, default: 10 })
  @AutoMap()
  @IsInt()
  @Min(1)
  @Max(10)
  public score: number;
}
