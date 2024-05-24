/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';

import {
  BOOK_REPOSITORY,
  IBookRepository,
} from './interface/book.repository.interface';
import { BookDto } from './dtos/book.dto';
import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @Inject(BOOK_REPOSITORY) private readonly bookRepository: IBookRepository,
  ) {}

  async getAllBooks(): Promise<[Book]> {
    return await this.bookRepository.getAllBooks();
  }

  async findOneById(id: string): Promise<Book> {
    try {
      return await this.bookRepository.findOneById(id);
    } catch (error) {
      throw error;
    }
  }

  async create(bookDto: BookDto) {
    const book = await this.bookRepository.create(bookDto);

    return book;
  }

  async updateById(id: string, updateBookDto: Partial<BookDto>): Promise<Book> {
    const existingBook = await this.bookRepository.findByIdAndUpdate(
      id,
      updateBookDto,
      { new: true },
    );
    return existingBook;
  }

  async deleteOneById(id: string): Promise<Book> {
    const deletedBook = await this.bookRepository.findByIdAndDelete(id);
    return deletedBook;
  }
}
