/* eslint-disable prettier/prettier */

import { BookDto } from '../dtos/book.dto';
import { Book } from '../schemas/book.schema';


export const BOOK_REPOSITORY = 'BOOK_REPOSITORY';

export interface IBookRepository {
  findOneById(id: string): Book | PromiseLike<Book>;
  findByIdAndDelete(id: string): Promise<Book>;
  findByIdAndUpdate(id: string, updateBookDto: Partial<BookDto>, arg2: { new: boolean; }): Promise<Book>;
  create(bookDto: BookDto): Promise<Book>;
  getAllBooks(): Promise<[Book] | null>;
  
}
