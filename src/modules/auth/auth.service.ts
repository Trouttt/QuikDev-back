import * as bcrypt from 'bcrypt';

import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AUTH_ERRORS } from '../../shared/helpers/responses/errors/auth-errors.helpers';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,

    private jwtService: JwtService,
  ) { }

  async signIn(user: CreateUserDto) {
    const verifyIfUserIsValid = await this.validateUser(
      user.username,
      user.password,
    );

    if (verifyIfUserIsValid) {
      const payload = {
        id: verifyIfUserIsValid.id,
        username: user.username,
        sub: verifyIfUserIsValid.id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new BadRequestException(AUTH_ERRORS.userDoesntExist);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);

    if (!user) {
      throw new BadRequestException(AUTH_ERRORS.userDoesntExist);
    }

    const verifiedPassword = await bcrypt.compare(password, user.password);

    if (!verifiedPassword) {
      throw new BadRequestException(AUTH_ERRORS.userDoesntExist);
    }
    const { password: passwordd, ...result } = user;

    return result;
  }
}
