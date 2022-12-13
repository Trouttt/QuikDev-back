import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Posts')
@ApiBadRequestResponse({ description: 'Bad Request' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiUnprocessableEntityResponse({ description: 'Unprocessable Entity' })
@ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
@ApiBearerAuth('jwt-token')
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @ApiOperation({
    summary: 'Create post',
    description: 'Create User endpoint. Create a new post',
  })
  @ApiCreatedResponse({ description: 'Created', type: User })
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req) {
    return this.postsService.create(req.headers.authorization, createPostDto);
  }
}
