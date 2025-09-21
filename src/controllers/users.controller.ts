import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  HttpCode,
  Query,
  ParseIntPipe,
  Inject,
} from '@nestjs/common';
import { UsersService } from '@/services';
import {
  BookBorrowingRequestDto,
  CreateUserRequestDto,
  GetUsersRequestDto,
  ReturnBookRequestDto,
} from '@/dtos/request';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { formatResponse } from '@/utils';
import { BookBorrowingsService } from '@/services';
import { BOOK_BORROWINGS_SERVICE_TOKEN, USERS_SERVICE_TOKEN } from '@/di';

@ApiTags('users')
@Controller('users')
export class UsersController {
  public constructor(
    @Inject(USERS_SERVICE_TOKEN)
    private readonly usersService: UsersService,
    @Inject(BOOK_BORROWINGS_SERVICE_TOKEN)
    private readonly bookBorrowingsService: BookBorrowingsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lists users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of users has been successfully retrieved.',
  })
  public async getUsersAsync(@Query() requestDto: GetUsersRequestDto) {
    const { limit } = requestDto;
    const {
      users,
      total: { count, page },
    } = await this.usersService.getUsersAsync(requestDto);

    return formatResponse(users, {
      total: count,
      page,
      limit,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieves information about a specific user' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the user',
    type: String,
    example: '1',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User information has been successfully retrieved.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
  public async getUserAsync(@Param('id', ParseIntPipe) id: number) {
    const responseDto = await this.usersService.getUserAsync(id);

    return formatResponse(responseDto);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiBody({
    type: CreateUserRequestDto,
    description: 'The data for the user to be created',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request body or missing data.',
  })
  public async createUserAsync(@Body() requestDto: CreateUserRequestDto) {
    const responseDto = await this.usersService.createUserAsync(requestDto);

    return formatResponse(responseDto);
  }

  @Post(':userId/borrow/:bookId')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Borrows a book' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Book successfully borrowed.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User has already borrowed this book.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User or Book not found.',
  })
  public async borrowBookAsync(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('bookId', ParseIntPipe) bookId: number,
  ) {
    const requestDto = new BookBorrowingRequestDto();
    requestDto.bookId = bookId;
    requestDto.userId = userId;

    const responseDto =
      await this.bookBorrowingsService.borrowBookAsync(requestDto);

    return formatResponse(responseDto);
  }

  @Post(':userId/return/:bookId')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Returns a borrowed book and gives a rating' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Book successfully returned and rated.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Active borrowing record not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid user score.',
  })
  public async returnBookAsync(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() requestDto: ReturnBookRequestDto,
  ) {
    const responseDto = await this.bookBorrowingsService.returnBookAsync(
      requestDto,
      userId,
      bookId,
    );

    return formatResponse(responseDto);
  }
}
