import { GetUserResponseDto } from './get-user.response.dto';

export class GetUsersResponseDto {
  public constructor(users: GetUserResponseDto[], count: number, page: number) {
    this.users = users;
    this.total = { count, page };
  }

  public users: GetUserResponseDto[];

  public total: { count: number; page: number };
}
