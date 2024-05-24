/* eslint-disable prettier/prettier */
import {
  Controller,
  Logger,
  Get,
  Body,
  Post,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserInfo } from 'src/consts/custom.decarator';

import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResourceService } from './resource.service';
import { ResourceDto } from './dtos/resource.dto';
import { Resource } from './schemas/resource.schema';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@ApiTags('resources')
@Controller('v1/resources')
export class ResourceController {
  private readonly logger = new Logger(ResourceController.name);
  jwtService: any;

  constructor(private readonly resourceService: ResourceService) {}

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<Resource> {
    return this.resourceService.findOneById(id);
  }

  @Get('')
  @ApiOperation({ summary: 'get all books' })
  @ApiResponse({ status: 200, description: 'get all book succesfully' })
  @ApiResponse({
    status: 401,
    description: 'Access token is invalid or expired',
  })
  async getAll() {
    try {
      return await this.resourceService.getAllBooks();
    } catch (error) {
      this.logger.error(`Registration failed: ${error.message}`);
      return { valid: false };
    }
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'create a new book' })
  @ApiResponse({ status: 201, description: 'create a new book successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(@Body() bookDto: ResourceDto, @UserInfo() userInfo: any) {
    try {
      console.log(userInfo);
      bookDto['uploader'] = userInfo.id;

      return await this.resourceService.create(bookDto);
    } catch (error) {
      this.logger.error(`Registration failed: ${error.message}`);
      throw error; // Re-throw the error to be handled by NestJS's global exception filter
    }
  }

  @Put(':id')
  @ApiBody({
    type: ResourceDto,
  })
  async updateById(
    @Param('id') id: string,
    @Body() updateBookDto: Partial<ResourceDto>,
  ): Promise<Resource> {
    return this.resourceService.updateById(id, updateBookDto);
  }

  @Delete(':id')
  async deleteOneById(@Param('id') id: string): Promise<Resource> {
    return this.resourceService.deleteOneById(id);
  }
}
