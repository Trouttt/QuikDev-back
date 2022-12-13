import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: "User's uuid",
    example: 'fe753d70-8a3a-4b09-9f98-3ccd9c979aed',
  })
  @IsString()
  @IsUUID()
  user_id: string;

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
