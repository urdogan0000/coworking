/* eslint-disable prettier/prettier */

import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBookRepository } from '../interface/book.repository.interface';
import { Book } from '../schemas/book.schema';
import { BookDto } from '../dtos/book.dto';
import { checkIsValidObjectId, findDocumentById } from 'src/utils/commmon.func';

@Injectable()
export class MongooseBookRepository implements IBookRepository {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async getAllBooks(): Promise<[Book]> {
    const books = (await this.bookModel.find().exec()) as [Book];

    return books;
  }

  async create(book: BookDto): Promise<Book> {
    const { title, author } = book;
    const existingBook = await this.bookModel.findOne({ title, author });
    if (existingBook) {
      throw new HttpException('Book already exists', 400);
    }

    const newBook = new this.bookModel(book);
    return newBook.save();
  }

  async findByIdAndUpdate(
    id: string,
    updateBookDto: Partial<BookDto>,
  ): Promise<Book> {
    try {
      checkIsValidObjectId(id);
      await findDocumentById(this.bookModel, id);
      return this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true });
    } catch (error) {
      throw error;
    }
  }

  async findByIdAndDelete(id: string): Promise<Book> {
    try {
      await findDocumentById(this.bookModel, id);
      checkIsValidObjectId(id);
      return this.bookModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: string): Promise<Book> {
    try {
      checkIsValidObjectId(id);
      await findDocumentById(this.bookModel, id);
      const book = await this.bookModel.findById(id);
   
      return book;
    } catch (error) {
      throw error;
    }
  }
}
