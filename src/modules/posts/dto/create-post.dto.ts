import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsObject, IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Title of post',
    example: 'soda makes you sick?',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of post',
    example:
      "i've heard of my friends that soda make persons sick, this is truth or not?",
  })
  @IsString()
  description: string;
}
