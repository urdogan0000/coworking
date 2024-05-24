/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LoginType {
  @Field(() => String)
  access_token: string;

  @Field(() => String)
  refresh_token: string;
}

@ObjectType()
export class UserType {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

}
