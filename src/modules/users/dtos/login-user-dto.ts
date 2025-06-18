import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    type: 'string',
    example: 'toxir@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    example: 'toxir123',
    minLength: 4,
    maxLength: 20,
    required: true,
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}

export class ForgotDto {
  @ApiProperty({
    type: 'string',
    example: 'toxir@gmail.com',
    required: true,
  })
  @IsEmail()
  email: string;
}