import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { UsersService } from '../users/users.service';
import { AuthController } from './auth.controller';

const moduleMocker = new ModuleMocker(global);

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    })
      .useMocker((token) => {
        const results = [{ email: 'test1', password: 'sdfas' }];

        if (token === UsersService) {
          return { findAll: jest.fn().mockResolvedValue(results) };
        }

        if (token === JwtService) {
          console.log('first');
          return { sign: jest.fn().mockResolvedValue(results[0].password) };
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

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
