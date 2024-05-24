/* eslint-disable prettier/prettier */
// src/books/books.resolver.ts

import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { LoginType, UserType } from './types/login.type';
import { UserService } from './user.service';
import { LoginInput, RegisterInput } from './dtos/login.graphql.dto';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [LoginType])
  async checkLogin(): Promise<[LoginType]> {
    return [{access_token:"asd",refresh_token:""}];
  }

  @Mutation(() => LoginType,{name: "login"})
  async login(@Args('loginInput') loginInput: LoginInput) {
    const { email, password } = loginInput
    return this.userService.validateUser(email, password);
  }

  @Mutation(() => UserType)
  async register(@Args('registerInput') registerInput: RegisterInput) {
    
    return this.userService.register(registerInput);
  }
}
