import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  ParseUUIDPipe,
  Post,
  UseGuards,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { PostFacade } from 'lib/post/application-services';
import { CreatePostDto, UpdatePostDto } from './dto';
import { JwtGuard } from 'lib/auth/guards/jwt.guard';
import { CurrentUser, ICurrentUser, Public } from 'lib/auth';
import { PaginationDto } from 'lib/shared/dto';
import { plainToClass } from 'class-transformer';
import { ResponseWithPagination } from 'lib/shared';
import { PostAggregate } from 'lib/post';
// import { v4 } from 'uuid';

@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postFacade: PostFacade) {}

  @Post()
  createPost(
    @CurrentUser() user: ICurrentUser,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postFacade.commands.createPost({
      ...createPostDto,
      // authorId: v4(),
      authorId: user.userId,
    });
  }

  // генерация токена =>  https://jwt.io/#debugger-io
  /** payload:
   *  {
   *    "userId": "2794feac-6ba2-443a-adac-8228d5b4866c",
   *    "email": "test@mail.ru",
   *    "roles": ["ADMIN"]
   *  }
   */

  @Public()
  @Get(':id')
  async getPostById(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.queries.getOnePost(id);
  }

  @Public()
  @Get()
  async getAllPost(
    @Query() paginationDto: PaginationDto,
  ): Promise<ResponseWithPagination<PostAggregate>> {
    const pagination = plainToClass(PaginationDto, paginationDto);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //  @ts-ignore
    const [data, count] = await this.postFacade.queries.getAllPosts(pagination);
    return {
      ...pagination,
      data,
      total: count,
    };
  }

  @Put()
  async updatePost(
    @CurrentUser() user: ICurrentUser,
    @Body() updatePost: UpdatePostDto,
  ) {
    return this.postFacade.commands.updatePost({
      ...updatePost,
      authorId: user.userId,
    });
  }

  @Patch(':id')
  async setPublished(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.commands.setPublished(id);
  }

  @Delete(':id')
  deletePost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.commands.deletePost(id);
  }
}
