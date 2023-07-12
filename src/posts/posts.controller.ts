import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostIdParamDto } from './dto/post-id-param.dto';
import { UserIdQueryDto } from './dto/user-id-query.dto';
import { Post as PostModel } from './models/post.model';
import { PostsService } from './posts.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  UseGuards,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({
    summary:
      'Get all posts (optionally find all posts of a specific user by user id)',
  })
  @ApiResponse({ status: 200, type: [PostModel] })
  @Get()
  findAll(@Query() userId?: UserIdQueryDto) {
    return this.postsService.findAll(userId?.userId);
  }

  @ApiOperation({ summary: 'Get post by post id' })
  @ApiResponse({ status: 200, type: PostModel })
  @Get('/:postId')
  findOne(@Param() postId: PostIdParamDto) {
    return this.postsService.findOne(postId.postId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add post (authorize required)' })
  @ApiResponse({ status: 201, type: PostModel })
  @ApiBody({ type: CreatePostDto })
  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete post (authorize required)' })
  @ApiResponse({ status: 200 })
  @Delete('/:postId')
  remove(@Param() postId: PostIdParamDto) {
    return this.postsService.remove(postId.postId);
  }
}
