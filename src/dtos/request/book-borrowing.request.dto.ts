import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class BookBorrowingRequestDto {
  @ApiProperty({ type: Number, required: true })
  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  public userId: number;

  @ApiProperty({ type: Number, required: true })
  @AutoMap()
  @IsNumber()
  @IsNotEmpty()
  public bookId: number;
}
