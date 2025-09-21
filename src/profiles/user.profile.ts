import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { BookBorrowing, User } from '@/entities';
import { CreateUserRequestDto } from '@/dtos/request';
import {
  CreateUserResponseDto,
  GetUserDetailResponseDto,
  GetUserResponseDto,
  BookBorrowingDto,
  BookBorrowingHistoryDto,
} from '@/dtos/response';

@Injectable()
export class UserProfile extends AutomapperProfile {
  public constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  public override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, User, GetUserResponseDto);
      createMap(mapper, User, CreateUserResponseDto);
      createMap(mapper, BookBorrowing, BookBorrowingDto);
      createMap(mapper, BookBorrowing, BookBorrowingHistoryDto);

      createMap(
        mapper,
        User,
        GetUserDetailResponseDto,
        forMember(
          (destination) => destination.pastBorrowings,
          mapFrom((s) => {
            return s.borrowings
              .filter((borrowing) => borrowing.isReturned)
              .map((e) => ({
                id: e.book.id,
                name: e.book.name,
                score: e.score,
              }));
          }),
        ),
        forMember(
          (d) => d.currentBorrowings,
          mapFrom((s) => {
            return s.borrowings
              .filter((borrowing) => !borrowing.isReturned)
              .map((e) => ({
                id: e.book.id,
                name: e.book.name,
              }));
          }),
        ),
      );

      createMap(mapper, CreateUserRequestDto, User);
    };
  }
}
