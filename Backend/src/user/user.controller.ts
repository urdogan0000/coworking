/* eslint-disable prettier/prettier */

import {
  Body,
  Controller,
  Post,
  Logger,
  Get,
  Query,
  UseGuards,
  HttpException,
  Param,
  Patch,
} from '@nestjs/common';
import { RegisterDto } from './dtos/register.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { LoginDto } from './dtos/login.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@ApiBearerAuth('JWT-auth')
@ApiTags('user')
@Controller('v1/user')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  jwtService: any;

  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.userService.register(registerDto);
    } catch (error) {
      this.logger.error(`Registration failed: ${error.message}`, error.stack);
      throw error; // Re-throw the error to be handled by NestJS's global exception filter
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBody({
    type: RegisterDto,
  })
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 200, description: 'User succesfully updatedy' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: Partial<RegisterDto>,
  ) {
    return this.userService.updateUser(id, updateData);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Log in a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.userService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      this.logger.warn(`Login failed for user: ${loginDto.email}`);
      throw new HttpException('invalid credentials', 400);
    }
    this.logger.log(`User logged in: ${loginDto.email}`);
    // Ideally, you would generate and return a JWT token here
    return { message: 'Login successful', ...user };
  }

  @UseGuards(JwtAuthGuard)
  @Get('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Access token refreshed successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async refresh(@Query('refresh_token') refreshToken: string) {
    const accessToken = await this.userService.refreshToken(refreshToken);
    if (!accessToken) {
      this.logger.warn(`Refresh token failed`);
      return { message: 'Invalid refresh token' };
    }
    return accessToken;
  }

  @UseGuards(JwtAuthGuard)
  @Get('validateAccessToken')
  @ApiOperation({ summary: 'Validate access token' })
  @ApiResponse({ status: 200, description: 'Access token is valid' })
  @ApiResponse({
    status: 401,
    description: 'Access token is invalid or expired',
  })
  async validateAccessToken(@Query('access_token') accessToken: string) {
    try {
      const isValid = await this.userService.validateAccessToken(accessToken);
      return isValid;
    } catch (error) {
      return { valid: false };
    }
  }
}
