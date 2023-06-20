import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './models/user.model';
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

describe('UserService', () => {
  let service: UsersService;
  // let model: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<UsersService>(UsersService);
    // model = module.get<typeof User>(getModelToken(User));
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

  // describe('findOne()', () => {
  //   it('should get a single user', () => {
  //     const findSpy = jest.spyOn(model, 'findOne');
  //     expect(service.findOne('1'));
  //     expect(findSpy).toBeCalledWith({ where: { id: '1' } });
  //   });
  // });

  // describe('remove()', () => {
  //   it('should remove a user', async () => {
  //     const findSpy = jest.spyOn(model, 'findOne').mockReturnValue({
  //       destroy: jest.fn(),
  //     } as any);
  //     const retVal = await service.remove('2');
  //     expect(findSpy).toBeCalledWith({ where: { id: '2' } });
  //     expect(retVal).toBeUndefined();
  //   });
  // });
});
