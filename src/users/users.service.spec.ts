import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { UserRolesEnum } from '../constants/constants';
import { RolesService } from '../roles/roles.service';
import { SetBanDto } from './dto/set-ban.dto';
import { SetRoleDto } from './dto/set-role.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';

const moduleMocker = new ModuleMocker(global);

const mockUsers = [
  {
    id: 1,
    email: 'email',
    password: 'password',
    $add: jest.fn(),
    $set: jest.fn(),
    save: jest.fn(),
  },
  {
    id: 2,
    email: 'email',
    password: 'password',
    $add: jest.fn(),
    $set: jest.fn(),
    save: jest.fn(),
  },
];

const mockUser = {
  id: 2,
  email: 'email',
  password: 'password',
  $add: jest.fn(),
  $set: jest.fn(),
  save: jest.fn(),
};

const mockRole = { id: 1, role: 'admin', description: 'admin' };

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
            findAll: jest.fn(() => mockUsers),
            create: jest.fn(() => mockUser),
            findOne: jest.fn(() => mockUser),
            findByPk: jest.fn(() => mockUser),
            remove: jest.fn(),
            addScope: jest.fn(),
            scope: jest.fn(() => model),
          },
        },
      ],
    })
      .useMocker((token) => {
        if (token === RolesService) {
          return {
            create: jest.fn().mockResolvedValue(mockRole),
            findOne: jest.fn().mockResolvedValue(mockRole),
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
    model.addScope('withoutPassword', {
      attributes: { exclude: ['password'] },
    });
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
      const createSpy = jest.spyOn(model, 'create');

      expect(createSpy).toBeCalledWith({
        email: 'email',
        password: 'password',
      });
      expect(user).toEqual(mockUser);
    });
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();

      expect(users).toEqual(mockUsers);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', async () => {
      const user = await service.findOne(2);

      expect(user.id).toBe(2);
    });
  });

  describe('remove()', () => {
    it('should remove a user', async () => {
      const findSpy = jest.spyOn(model, 'findByPk').mockReturnValue({
        destroy: jest.fn(),
      } as any);
      const deletedUser = await service.remove(2);

      expect(findSpy).toBeCalledWith(2);
      expect(deletedUser).toBeUndefined();
    });
  });

  describe('setRole()', () => {
    const mockSetRoleDto: SetRoleDto = {
      role: UserRolesEnum.admin,
      userId: 1,
    };

    it('should add role for a user', async () => {
      const userSpy = jest.spyOn(model, 'findByPk');

      await service.setRole(mockSetRoleDto);

      expect(userSpy).toBeCalledWith(mockSetRoleDto.userId);
    });
  });

  describe('setBan()', () => {
    const mockSetBanDto: SetBanDto = {
      banReason: 'scam',
      userId: 1,
    };

    it('should add role for a user', async () => {
      const userSpy = jest.spyOn(model, 'findByPk');

      await service.setBan(mockSetBanDto);

      expect(userSpy).toBeCalledWith(mockSetBanDto.userId);
    });
  });

  describe('removeBan()', () => {
    it('should add role for a user', async () => {
      const userSpy = jest.spyOn(model, 'findByPk');

      await service.removeBan(1);

      expect(userSpy).toBeCalledWith(1);
    });
  });
});
