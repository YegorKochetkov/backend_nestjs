import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { FilesService } from '../files/files.service';
import { UsersService } from '../users/users.service';
import { Post } from './models/post.model';
import { PostsService } from './posts.service';

const moduleMocker = new ModuleMocker(global);

const mockPosts = [
  {
    id: 1,
    title: 'email',
    content: 'password',
  },
  {
    id: 2,
    title: 'email',
    content: 'password',
  },
];

const mockPost = {
  id: 1,
  title: 'email',
  content: 'password',
};

const mockUser = {
  id: 2,
  email: 'email',
  password: 'password',
  $add: jest.fn(),
  $set: jest.fn(),
  save: jest.fn(),
};

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getModelToken(Post),
          useValue: {
            findAll: jest.fn(() => mockPosts),
            create: jest.fn(() => mockPost),
            findOne: jest.fn(() => mockPost),
            findByPk: jest.fn(() => mockPost),
            remove: jest.fn(),
          },
        },
        FilesService,
      ],
    })
      .useMocker((token) => {
        if (token === UsersService) {
          return {
            create: jest.fn().mockResolvedValue(mockUser),
            findOne: jest.fn().mockResolvedValue(mockUser),
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

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
