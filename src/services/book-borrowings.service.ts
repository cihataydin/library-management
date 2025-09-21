import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BookBorrowing } from '@/entities';
import {
  BookBorrowingDto,
  BookBorrowingRequestDto,
  BookBorrowingResponseDto,
  ReturnBookRequestDto,
  ReturnBookResponseDto,
} from '@/dtos';
import { Book, User } from '@/entities';
import { BookLogic } from '@/logics';
import { CACHE_TOKEN } from '@/di';
import { ICacheService } from '@/infra/cache';
import { IBookBorrowingsService } from '@/interfaces';

@Injectable()
export class BookBorrowingsService implements IBookBorrowingsService {
  public constructor(
    @InjectRepository(BookBorrowing)
    private borrowingsRepository: Repository<BookBorrowing>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectMapper()
    private readonly mapper: Mapper,
    private dataSource: DataSource,
    @Inject(CACHE_TOKEN) private readonly cacheService: ICacheService,
  ) {}

  public async borrowBookAsync(
    borrowBookDto: BookBorrowingRequestDto,
  ): Promise<BookBorrowingDto> {
    const { userId, bookId } = borrowBookDto;

    await this.checkEntitiesExistAsync(userId, bookId);

    const isBorrowed = await this.borrowingsRepository.findOne({
      where: { book: { id: bookId }, isReturned: false },
    });

    if (isBorrowed) {
      throw new ConflictException(
        'This book is currently unavailable as it has already been borrowed.',
      );
    }

    const createdBorrowing = this.borrowingsRepository.create({
      user: { id: userId },
      book: { id: bookId },
    });

    await this.borrowingsRepository.save(createdBorrowing);

    return this.mapper.map(
      createdBorrowing,
      BookBorrowing,
      BookBorrowingResponseDto,
    );
  }

  public async returnBookAsync(
    returnBookDto: ReturnBookRequestDto,
    userId: number,
    bookId: number,
  ): Promise<ReturnBookResponseDto> {
    const { score } = returnBookDto;

    await this.checkEntitiesExistAsync(userId, bookId);

    const borrowing = await this.borrowingsRepository.findOne({
      where: { book: { id: bookId }, user: { id: userId }, isReturned: false },
      relations: ['book'],
    });

    if (!borrowing) {
      throw new NotFoundException('Active borrowing record not found.');
    }

    const book = borrowing.book;
    const { newAverageRating, newTotalRatings } = BookLogic.rateBook(
      book,
      score,
    );

    await this.dataSource.transaction(async (manager) => {
      borrowing.isReturned = true;
      borrowing.score = score;
      borrowing.returnedAt = new Date();
      await manager.save(borrowing);

      book.averageRating = newAverageRating;
      book.totalRatings = newTotalRatings;
      await manager.save(book);

      await this.cacheService.setAsync(`book_${book.id}`, JSON.stringify(book));
    });

    const responseDto = this.mapper.map(
      borrowing,
      BookBorrowing,
      ReturnBookResponseDto,
    );

    responseDto.userId = userId;
    responseDto.score = score;

    return responseDto;
  }

  private async checkEntitiesExistAsync(
    userId: number,
    bookId: number,
  ): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException('Book not found.');
    }
  }
}
