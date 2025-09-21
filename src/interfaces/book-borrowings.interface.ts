import {
  BookBorrowingDto,
  BookBorrowingRequestDto,
  ReturnBookRequestDto,
  ReturnBookResponseDto,
} from '@/dtos';

export interface IBookBorrowingsService {
  borrowBookAsync(
    borrowBookDto: BookBorrowingRequestDto,
  ): Promise<BookBorrowingDto>;
  returnBookAsync(
    returnBookDto: ReturnBookRequestDto,
    userId: number,
    bookId: number,
  ): Promise<ReturnBookResponseDto>;
}
