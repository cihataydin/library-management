import { CreateBookRequestDto, GetBooksRequestDto } from '@/dtos/request';
import {
  GetBooksResponseDto,
  GetBookResponseDto,
  CreateBookResponseDto,
} from '@/dtos/response';

export interface IBooksService {
  getBooksAsync(requestDto: GetBooksRequestDto): Promise<GetBooksResponseDto>;
  getBookAsync(id: number): Promise<GetBookResponseDto>;
  createBookAsync(
    requestDto: CreateBookRequestDto,
  ): Promise<CreateBookResponseDto>;
}
