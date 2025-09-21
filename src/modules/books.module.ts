import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '@/entities';
import { BooksController } from '@/controllers';
import { BooksService } from '@/services';
import { BookProfile } from '@/profiles';
import { CacheModule } from '@/infra/cache';
import { BOOKS_SERVICE_TOKEN } from '@/di';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), CacheModule],
  controllers: [BooksController],
  providers: [
    BookProfile,
    {
      provide: BOOKS_SERVICE_TOKEN,
      useClass: BooksService,
    },
  ],
})
export class BooksModule {}
