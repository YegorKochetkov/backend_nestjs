import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { RolesService } from '../roles/roles.service';
import { User } from './models/user.model';
import { UsersService } from './users.service';

const moduleMocker = new ModuleMocker(global);

const usersArray = [
  {
    email: 'email',
    password: 'password',
  },
  {
    email: 'email2',
    password: 'password2',
  },
];

const oneUser = {
  email: 'email',
  password: 'password',
  $set: () => ({}),
};

describe('UserService', () => {
  let service: UsersService;
  let model: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: {
            findAll: jest.fn(() => usersArray),
            create: jest.fn(() => oneUser),
            findOne: jest.fn(() => oneUser),
            remove: jest.fn(),
          },
        },
      ],
    })
      .useMocker((token) => {
        const results = { role: 'test1', description: 'admin' };

        if (token === RolesService) {
          return {
            create: jest.fn().mockResolvedValue(results),
            findOne: jest.fn().mockResolvedValue(results),
          };
        }

        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;

          const Mock = moduleMocker.generateFromMetadata(mockMetadata);

          return new Mock();
        }
      })
      .compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<typeof User>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should successfully insert a user', async () => {
      const user = await service.create({
        email: 'email',
        password: 'password',
      });

      expect(user).toEqual(oneUser);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();

      expect(users).toEqual(usersArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const findSpy = jest.spyOn(model, 'findOne');
      expect(service.findOne(1));
      expect(findSpy).toBeCalledWith({ where: { id: 1 } });
    });
  });

  describe('remove()', () => {
    it('should remove a user', async () => {
      const findSpy = jest.spyOn(model, 'findOne').mockReturnValue({
        destroy: jest.fn(),
      } as any);
      const deletedUser = await service.remove(2);
      expect(findSpy).toBeCalledWith({ where: { id: 2 } });
      expect(deletedUser).toBeUndefined();
    });
  });
});
