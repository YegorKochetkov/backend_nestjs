import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { Post } from './models/post.model';
import { PostsController } from './posts.controller';
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

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
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
      ],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);

          return new Mock();
        }
      })

      .compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
