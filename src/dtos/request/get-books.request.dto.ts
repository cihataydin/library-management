import { AutoMap } from '@automapper/classes';
import { BaseFilterRequestDto } from './base-filter.request.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetBooksRequestDto extends BaseFilterRequestDto {
  @ApiProperty({ type: String, required: false })
  @AutoMap()
  @IsString()
  @IsOptional()
  public name?: string;
}
