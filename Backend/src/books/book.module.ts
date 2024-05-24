/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book, BookSchema } from './schemas/book.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BOOK_REPOSITORY } from './interface/book.repository.interface';
import { MongooseBookRepository } from './repository/book.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  controllers: [BookController],
  providers: [
    BookService,
    {
      provide: BOOK_REPOSITORY,
      useClass: MongooseBookRepository,
    },
  ],
})
export class BookModule {}
