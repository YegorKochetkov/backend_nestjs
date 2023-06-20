import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './models/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

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
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
