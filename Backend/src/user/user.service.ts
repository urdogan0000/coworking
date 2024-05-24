/* eslint-disable prettier/prettier */

import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { User } from './schemas/user.schema';
import {
  IUserRepository,
  USER_REPOSITORY,
} from './interface/user-repository-interface';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/consts/constants';
import { checkIsValidObjectId } from 'src/utils/commmon.func';
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerBody: RegisterDto): Promise<User> {
    try {
      const { email } = registerBody;
      const isUserExist = await this.userRepository.findByEmail(email);
      console.log(isUserExist);
      if (isUserExist) {
        throw new HttpException(
          { message: 'user already exist ', status: 400 },
          400,
        );
      }

      const createdUser = await this.userRepository.create(registerBody);
      this.logger.log(`User registered successfully: ${createdUser.username}`);
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      this.logger.error(
        `User registration failed: ${error.message}`,
        error.stack,
      );
      throw error;
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    console.log(email, password);

    const user = await this.userRepository.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { username: user.username, sub: user._id };
      user.password = undefined;
      return {
        access_token: this.jwtService.sign(payload),
        refresh_token: this.jwtService.sign(payload, {
          secret: jwtConstants.refreshTokenSecret,
          expiresIn: '7d',
        }),
        user,
      };
    }
    return null;
  }

  async refreshToken(refreshToken: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: jwtConstants.refreshTokenSecret,
      });
      const payload = { username: decoded.username, sub: decoded.sub };
      return {
        access_token: this.jwtService.sign(payload, {
          secret: jwtConstants.accessTokenSecret,
          expiresIn: '15m',
        }),
      };
    } catch (error) {
      return null;
    }
  }

  async validateAccessToken(accessToken: string) {
    try {
      this.jwtService.verify(accessToken, {
        secret: jwtConstants.accessTokenSecret,
      });
      return { valid: true };
    } catch (error) {
      return { valid: false };
    }
  }
  async updateUser(userId: string, updateData: Partial<User>): Promise<User> {
    try {
      checkIsValidObjectId(userId);

      if (updateData.password && updateData.password.trim().length > 5) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      } else {
        delete updateData.password;
      }

      delete updateData.password;
      const updatedUser = await this.userRepository.update(userId, updateData);
      this.logger.log(`User updated successfully: ${updatedUser.username}`);
      updatedUser.password = undefined;
      return updatedUser;
    } catch (error) {
      this.logger.error(`User update failed: ${error.message}`, error.stack);
      throw error;
    }
  }
}
