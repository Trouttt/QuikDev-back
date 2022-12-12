import { faker } from '@faker-js/faker';
import * as Factory from 'factory.ts';
import { CreateUserDto } from '../../../src/modules/users/dto/create-user.dto';

export function createUserDTOFactory(): Factory.Sync.Factory<
  CreateUserDto,
  keyof CreateUserDto
> {
  return Factory.Sync.makeFactory<CreateUserDto>({
    username: faker.name.fullName(),
    password: faker.datatype.uuid(),
  });
}
