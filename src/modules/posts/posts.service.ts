import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { USER_ERRORS } from 'src/shared/helpers/responses/errors/user-errors.helpers';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    private readonly authService: AuthService,

    private readonly userService: UsersService,
  ) { }
  async create(token: string, createPostDto: CreatePostDto) {
    const user_id: string = await this.authService.decodeTokenToGetUserId(
      token,
    );
    const user: User = await this.userService.findOneById(user_id);

    if (!user) {
      throw new NotFoundException(USER_ERRORS.userDoesntExistWithThisId);
    }

    const post = this.postRepository.create(createPostDto);

    post.user = user;

    return this.postRepository.save(post);
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
