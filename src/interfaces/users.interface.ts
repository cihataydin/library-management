import { CreateUserRequestDto, GetUsersRequestDto } from '@/dtos';
import {
  CreateUserResponseDto,
  GetUserDetailResponseDto,
  GetUsersResponseDto,
} from '@/dtos/response';

export interface IUsersService {
  getUsersAsync(requestDto: GetUsersRequestDto): Promise<GetUsersResponseDto>;
  getUserAsync(id: number): Promise<GetUserDetailResponseDto>;
  createUserAsync(
    requestDto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto>;
}
