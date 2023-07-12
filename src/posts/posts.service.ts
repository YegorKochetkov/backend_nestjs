import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './models/post.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post) private postRepository: typeof Post) {}

  async create(createPostDto: CreatePostDto) {
    const imgFileName = 'dfasd';

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
