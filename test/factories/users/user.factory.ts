import { User } from '../../../src/modules/users/entities/user.entity';
import * as Factory from 'factory.ts';
import { faker } from '@faker-js/faker/locale/pt_BR';

function createFactory(): Factory.Sync.Factory<User, keyof User> {
  return Factory.Sync.makeFactory<User>({
    id: faker.datatype.uuid(),
    username: faker.name.fullName(),
    password: faker.datatype.uuid(),
  });
}

export function userFactory(): Factory.Sync.Factory<User, keyof User> {
  return createFactory();
}
