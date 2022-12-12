import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { CreateUserDto } from '../../../../src/modules/users/dto/create-user.dto';
import { User } from '../../../../src/modules/users/entities/user.entity';
import { createUserDTOFactory } from '../../../factories/users/create-user-dto.factory';
import { userFactory } from '../../../factories/users/user.factory';
import { UsersController } from '../../../../src/modules/users/users.controller';
import { UsersService } from '../../../../src/modules/users/users.service';

describe('UsersController', () => {
  const createUserDto: CreateUserDto = createUserDTOFactory().build();
  const token =
    'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  let userController: UsersController;
  let userService: UsersService;

  beforeAll(async (): Promise<void> => {
    const ApiServiceProvider = {
      provide: UsersService,
      useFactory: () => ({
        signIn: jest.fn((): { access_token: string } => {
          return { access_token: token };
        }),
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, ApiServiceProvider],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should create a token', async () => {
    const result: { access_token: string } = await userController.signIn(
      createUserDto,
    );

    expect(result).not.toEqual(null);
    expect(userService.signIn).toHaveBeenCalledWith(createUserDto);
    expect(result).toEqual({ access_token: token });
  });
});
