import { AutoMap } from '@automapper/classes';
import { GetUserResponseDto } from './get-user.response.dto';
import {
  GetBookBorrowedHistoryResponseDto,
  GetBookBorrowedResponseDto,
} from './get-book.response.dto';

export class GetUserDetailResponseDto extends GetUserResponseDto {
  @AutoMap(() => [GetBookBorrowedHistoryResponseDto])
  public pastBorrowings: GetBookBorrowedHistoryResponseDto[];

  @AutoMap(() => [GetBookBorrowedResponseDto])
  public currentBorrowings: GetBookBorrowedHistoryResponseDto[];
}
