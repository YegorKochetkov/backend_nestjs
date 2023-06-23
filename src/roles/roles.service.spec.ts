import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from './models/role.model';
import { RolesService } from './roles.service';

const oneRole = {
  role: 'admin',
  description: 'admin',
};

describe('RolesService', () => {
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getModelToken(Role),
          useValue: {
            findOne: jest.fn(() => oneRole),
            create: jest.fn(() => oneRole),
            findAll: jest.fn(() => [oneRole]),
          },
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
