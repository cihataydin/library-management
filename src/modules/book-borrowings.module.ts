import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookBorrowingsService } from '@/services';
import { BookBorrowingProfile } from '@/profiles';
import { Book, User, BookBorrowing } from '@/entities';
import { CacheModule } from '@/infra/cache';
import { BOOK_BORROWINGS_SERVICE_TOKEN } from '@/di';

@Module({
  imports: [TypeOrmModule.forFeature([BookBorrowing, Book, User]), CacheModule],
  controllers: [],
  providers: [
    BookBorrowingProfile,
    {
      provide: BOOK_BORROWINGS_SERVICE_TOKEN,
      useClass: BookBorrowingsService,
    },
  ],
  exports: [BOOK_BORROWINGS_SERVICE_TOKEN],
})
export class BookBorrowingsModule {}
