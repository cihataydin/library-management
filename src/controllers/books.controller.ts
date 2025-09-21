import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  Query,
  ParseIntPipe,
  HttpCode,
  Inject,
} from '@nestjs/common';
import { BooksService } from '@/services';
import { CreateBookRequestDto } from '@/dtos/';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { GetBooksRequestDto } from '@/dtos/request';
import { formatResponse } from '@/utils';
import { BOOKS_SERVICE_TOKEN } from '@/di';

@ApiTags('books')
@Controller('books')
export class BooksController {
  public constructor(
    @Inject(BOOKS_SERVICE_TOKEN) private readonly booksService: BooksService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Lists books' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The list of books has been successfully retrieved.',
  })
  public async getBooksAsync(@Query() requestDto: GetBooksRequestDto) {
    const { limit } = requestDto;
    const {
      books,
      total: { page, count },
    } = await this.booksService.getBooksAsync(requestDto);

    return formatResponse(books, {
      total: count,
      page,
      limit,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Retrieves information about a specific book' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the book',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The book information has been successfully retrieved.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Book not found.',
  })
  public async getBookAsync(@Param('id', ParseIntPipe) id: number) {
    const responseDto = await this.booksService.getBookAsync(id);

    return formatResponse(responseDto);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creates a new book' })
  @ApiBody({
    type: CreateBookRequestDto,
    description: 'The data for the book to be created',
    required: true,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The book has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid request body or missing data.',
  })
  public async createBookAsync(@Body() createBookDto: CreateBookRequestDto) {
    const responseDto = await this.booksService.createBookAsync(createBookDto);

    return formatResponse(responseDto);
  }
}
