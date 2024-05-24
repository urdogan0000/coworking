/* eslint-disable prettier/prettier */
// src/books/dto/create-book.input.ts

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}


@InputType()
export class RegisterInput {
  @Field()
  email: string;

  @Field()
  password: string;
  
  @Field()
  username: string;
}