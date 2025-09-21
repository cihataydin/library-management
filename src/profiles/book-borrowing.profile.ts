import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { BookBorrowing } from '@/entities';
import {
  BookBorrowingDto,
  BookBorrowingHistoryDto,
  BookBorrowingRequestDto,
  BookBorrowingResponseDto,
  ReturnBookResponseDto,
} from '@/dtos';

@Injectable()
export class BookBorrowingProfile extends AutomapperProfile {
  public constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  public override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, BookBorrowing, BookBorrowingDto);
      createMap(mapper, BookBorrowing, BookBorrowingHistoryDto);

      createMap(mapper, BookBorrowingRequestDto, BookBorrowing);
      createMap(
        mapper,
        BookBorrowing,
        BookBorrowingResponseDto,
        forMember(
          (d) => d.isReturned,
          mapFrom((s) => s.isReturned),
        ),
        forMember(
          (d) => d.borrowedAt,
          mapFrom((s) => s.borrowedAt),
        ),
        forMember(
          (d) => d.userId,
          mapFrom((s) => s.user?.id),
        ),
        forMember(
          (d) => d.bookId,
          mapFrom((s) => s.book?.id),
        ),
      );

      createMap(
        mapper,
        BookBorrowing,
        ReturnBookResponseDto,
        forMember(
          (d) => d.isReturned,
          mapFrom((s) => s.isReturned),
        ),
        forMember(
          (d) => d.borrowedAt,
          mapFrom((s) => s.borrowedAt),
        ),
        forMember(
          (d) => d.returnedAt,
          mapFrom((s) => s.returnedAt),
        ),
        forMember(
          (d) => d.bookId,
          mapFrom((s) => s.book?.id),
        ),
      );
    };
  }
}
