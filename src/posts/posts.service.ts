import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { UsersService } from '../users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './models/post.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private filesService: FilesService,
    private usersService: UsersService,
  ) {}

  async create(createPostDto: CreatePostDto, image: Express.Multer.File) {
    await this.usersService.findOne(createPostDto.userId);

    const imgFileName = await this.filesService.createFile(image);

    return await this.postRepository
      .create({
        ...createPostDto,
        image: imgFileName,
      })
      .catch((error) => {
        throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
      });
  }

  async findAll(userId: number) {
    const findOptions = userId
      ? {
          where: { userId },
        }
      : {};

    return await this.postRepository.findAll(findOptions).catch((error) => {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    });
  }

  async findOne(postId: number) {
    const post = await this.postRepository.findByPk(postId).catch((error) => {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  async remove(postId: number) {
    const post = await this.postRepository.findByPk(postId).catch((error) => {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    });

    if (!post) {
      return;
    }

    await post.destroy();
  }
}
