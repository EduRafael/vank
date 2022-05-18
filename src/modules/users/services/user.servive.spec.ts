import { Test, TestingModuleBuilder } from '@nestjs/testing';
import { UserCreateDto, UserUpdateDto } from '../dtos/user-input.dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from './user.service';

describe('User service', () => {
  let userEntity: UserEntity;
  let userService: UserService;
  let userCreateDto: UserCreateDto;
  let userUpdateDto: UserUpdateDto;
  let findRepository;
  let saveRepository;
  let mockUserRepository;
  let module: TestingModuleBuilder;

  beforeEach(async () => {
    userEntity = Object.assign(new UserEntity(), UserEntity);
    userUpdateDto = Object.assign(new UserUpdateDto(), UserUpdateDto);
    userCreateDto = Object.assign(new UserCreateDto(), UserCreateDto);
    findRepository = jest.fn().mockResolvedValue(1);
    saveRepository = jest.fn().mockResolvedValue(1);

    mockUserRepository = {
      useValue: {
        save: saveRepository,
        find: findRepository,
      },
    };

    module = await createTestingModule([]);
    module = await createTestingModule([UserService, mockUserRepository]);
    const moduleCompiled = await module.compile();

    userService = moduleCompiled.get<UserService>(UserService);
  });

  it.skip('update user', async () => {
    await userService.update('1', { taxId: 'eee' });
    expect(mockUserRepository).toBeCalled();
  });

  const createTestingModule = async (providers: any[]) => {
    module = await Test.createTestingModule({
      providers,
    });
    providers
      .slice(1)
      .reduce(
        (pre, curr) =>
          pre.overrideProvider(curr.provide).useValue(curr.useValue),
        module,
      );
    return module;
  };
});
