import { GetBookResponseDto } from './get-book.response.dto';

export class GetBooksResponseDto {
  public constructor(books: GetBookResponseDto[], count: number, page: number) {
    this.books = books;
    this.total = { count, page };
  }

  public books: GetBookResponseDto[];

  public total: { count: number; page: number };
}
