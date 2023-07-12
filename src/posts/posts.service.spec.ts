import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Post } from './models/post.model';
import { PostsService } from './posts.service';

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
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
