import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { UsersService } from '../users/users.service';
import { RolesController } from './roles.controller';

const moduleMocker = new ModuleMocker(global);

describe('RolesController', () => {
  let controller: RolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
    })
      .useMocker((token) => {
        const results = [{ user: 'test1' }, { user: 'test2' }];

        if (token === UsersService) {
          return { findAll: jest.fn().mockResolvedValue(results) };
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

    controller = module.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
