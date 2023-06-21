import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { RolesService } from '../roles/roles.service';
import { User } from './models/user.model';
import { UsersController } from './users.controller';
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
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: {
            findAll: jest.fn(() => usersArray),
            create: jest.fn(() => oneUser),
            // findOne: jest.fn(),
            // remove: jest.fn(),
            // destroy: jest.fn(() => oneUser),
          },
        },
      ],
    })
      .useMocker((token) => {
        const results = { role: 'test1', description: 'admin' };

        if (token === RolesService) {
          return { findOne: jest.fn().mockResolvedValue(results) };
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

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
