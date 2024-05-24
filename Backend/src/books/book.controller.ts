/* eslint-disable prettier/prettier */
import {
  Controller,
  Logger,
  Get,
  Body,
  Post,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserInfo } from 'src/consts/custom.decarator';

import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { BookDto } from './dtos/book.dto';
import { Book } from './schemas/book.schema';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@ApiTags('books')
@Controller('v1/books')
export class BookController {
  private readonly logger = new Logger(BookController.name);
  jwtService: any;

  constructor(private readonly bookService: BookService) {}

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOneById(id);
  }

  @Get('')
  @ApiOperation({ summary: 'get all books' })
  @ApiResponse({ status: 200, description: 'get all book succesfully' })
  @ApiResponse({
    status: 401,
    description: 'Access token is invalid or expired',
  })
  async getAll() {
    try {
      return await this.bookService.getAllBooks();
    } catch (error) {
      this.logger.error(`Registration failed: ${error.message}`);
      return { valid: false };
    }
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'create a new book' })
  @ApiResponse({ status: 201, description: 'create a new book successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Body() bookDto: BookDto, @UserInfo() userInfo: any) {
    try {
      console.log(userInfo);
      bookDto['uploader'] = userInfo.id;

      return await this.bookService.create(bookDto);
    } catch (error) {
      this.logger.error(`Registration failed: ${error.message}`);
      throw error; // Re-throw the error to be handled by NestJS's global exception filter
    }
  }

  @Put(':id')
  @ApiBody({
    type: BookDto,
  })
  async updateById(
    @Param('id') id: string,
    @Body() updateBookDto: Partial<BookDto>,
  ): Promise<Book> {
    return this.bookService.updateById(id, updateBookDto);
  }

  @Delete(':id')
  async deleteOneById(@Param('id') id: string): Promise<Book> {
    return this.bookService.deleteOneById(id);
  }
}
