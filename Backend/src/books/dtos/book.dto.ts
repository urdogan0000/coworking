/* eslint-disable prettier/prettier */
// src/login/dto/login.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class BookDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ type: 'number', minimum: 1 })
  @IsNumber()
  @Min(1)
  pageNumber: number;
}
