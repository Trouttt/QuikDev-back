import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from '../../../../src/modules/users/dto/create-user.dto';
import { User } from '../../../../src/modules/users/entities/user.entity';
import { createUserDTOFactory } from '../../../factories/users/create-user-dto.factory';
import { userFactory } from '../../../factories/users/user.factory';
import { UsersController } from '../../../../src/modules/users/users.controller';
import { UsersService } from '../../../../src/modules/users/users.service';

describe('UsersController', () => {
  const createUserDto: CreateUserDto = createUserDTOFactory().build();
  const user: User = userFactory().build({
    ...createUserDto,
  });

  let userController: UsersController;
  let userService: UsersService;

  beforeAll(async (): Promise<void> => {
    const ApiServiceProvider = {
      provide: UsersService,
      useFactory: () => ({
        create: jest.fn((): User => user),
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

  it('should create a user', async () => {
    const result: User = await userController.create(createUserDto);

    expect(result).not.toEqual(null);
    expect(userService.create).toHaveBeenCalledWith(createUserDto);
    expect(result).toEqual(user);
  });
});
