import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Book } from '@/entities';
import { CreateBookResponseDto, GetBookResponseDto } from '@/dtos/response';
import { CreateBookRequestDto } from '@/dtos/request';

@Injectable()
export class BookProfile extends AutomapperProfile {
  public constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  public override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, Book, GetBookResponseDto);
      createMap(mapper, Book, CreateBookResponseDto);
      createMap(mapper, CreateBookRequestDto, Book);
    };
  }
}
