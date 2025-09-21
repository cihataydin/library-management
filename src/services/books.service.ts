import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Book } from '@/entities';
import { CreateBookRequestDto, GetBooksRequestDto } from '@/dtos/request';
import { CACHE_TOKEN } from '@/di';
import { ICacheService } from '@/infra/cache';
import { PaginationUtil } from '@/utils';
import {
  GetBooksResponseDto,
  GetBookResponseDto,
  CreateBookResponseDto,
} from '@/dtos/response';
import { IBooksService } from '@/interfaces';

@Injectable()
export class BooksService implements IBooksService {
  public constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectMapper()
    private readonly mapper: Mapper,
    @Inject(CACHE_TOKEN) private readonly cacheService: ICacheService,
  ) {}

  public async getBooksAsync(
    requestDto: GetBooksRequestDto,
  ): Promise<GetBooksResponseDto> {
    const { limit, page, direction, orderBy, name } = requestDto;
    const where = {
      ...(name ? { name } : {}),
    };
    const [bookEntities, count] = await this.booksRepository.findAndCount({
      where,
      skip: PaginationUtil.calculateSkip(page, limit),
      take: limit,
      order: {
        [orderBy]: direction,
        id: 'asc',
      },
    });
    const bookDtos = this.mapper.mapArray(
      bookEntities,
      Book,
      GetBookResponseDto,
    );

    return new GetBooksResponseDto(bookDtos, count, page);
  }

  public async getBookAsync(id: number): Promise<GetBookResponseDto> {
    const bookCache = await this.cacheService.getAsync<Book>(`book_${id}`);

    if (bookCache) {
      return this.mapper.map(bookCache, Book, GetBookResponseDto);
    }
    const book = await this.booksRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Book with ID '${id}' not found`);
    }

    await this.cacheService.setAsync(`book_${id}`, JSON.stringify(book));

    return this.mapper.map(book, Book, GetBookResponseDto);
  }

  public async createBookAsync(
    requestDto: CreateBookRequestDto,
  ): Promise<CreateBookResponseDto> {
    const book = this.mapper.map(requestDto, CreateBookRequestDto, Book);
    const createdBook = this.booksRepository.create(book);

    await this.booksRepository.save(createdBook);

    return this.mapper.map(createdBook, Book, CreateBookResponseDto);
  }
}
