import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { User } from '@/entities';
import { CreateUserRequestDto, GetUsersRequestDto } from '@/dtos';
import { PaginationUtil } from '@/utils';
import {
  CreateUserResponseDto,
  GetUserDetailResponseDto,
  GetUserResponseDto,
  GetUsersResponseDto,
} from '@/dtos/response';
import { IUsersService } from '@/interfaces';

@Injectable()
export class UsersService implements IUsersService {
  public constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  public async getUsersAsync(
    requestDto: GetUsersRequestDto,
  ): Promise<GetUsersResponseDto> {
    const { limit, page, direction, orderBy, name } = requestDto;
    const where = {
      ...(name ? { name } : {}),
    };
    const [userEntities, count] = await this.usersRepository.findAndCount({
      where,
      skip: PaginationUtil.calculateSkip(page, limit),
      take: limit,
      order: {
        [orderBy]: direction,
        id: 'asc',
      },
    });

    const responseDtos = this.mapper.mapArray(
      userEntities,
      User,
      GetUserResponseDto,
    );

    return new GetUsersResponseDto(responseDtos, count, page);
  }

  public async getUserAsync(id: number): Promise<GetUserDetailResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['borrowings', 'borrowings.book'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID '${id}' not found`);
    }

    return this.mapper.map(user, User, GetUserDetailResponseDto);
  }

  public async createUserAsync(
    requestDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const user = this.mapper.map(requestDto, CreateUserRequestDto, User);
    const createdUser = this.usersRepository.create(user);

    await this.usersRepository.save(createdUser);

    return this.mapper.map(createdUser, User, CreateUserResponseDto);
  }
}
