import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { PostEntity } from '../entities/post.entity';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto {
  @ApiPropertyOptional({
    description: 'Title of post',
    example: 'soda makes you sick?',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Description of post',
    example:
      "i've heard of my friends that soda make persons sick, this is truth or not?",
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  image_path?: string;
}
