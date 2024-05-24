/* eslint-disable prettier/prettier */
// src/register/dto/register.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(4)
  @MaxLength(10)
  password: string;
}
