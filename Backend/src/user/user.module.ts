/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './schemas/user.schema';

import { USER_REPOSITORY } from './interface/user-repository-interface';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseUserRepository } from './repository/user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { UserResolver } from './user.resolver';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema, collection: 'users' },
    ]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserResolver,
    {
      provide: USER_REPOSITORY,
      useClass: MongooseUserRepository,
    },
  ],
})
export class RegisterModule {}
