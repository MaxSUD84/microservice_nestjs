import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { CurrentUser, ICurrentUser, Public } from 'lib/auth';
import { JwtGuard } from 'lib/auth/guards/jwt.guard';
import { PostAggregate } from 'lib/post';
import { PostFacade } from 'lib/post/application-services';
import { ApiOkResponsePaginated, ResponseWithPagination } from 'lib/shared';
import { PaginationDto } from 'lib/shared/dto';
import { CreatePostDto, UpdatePostDto } from './dto';
import { PostResponse } from './responses';
// import { v4 } from 'uuid';

@ApiTags('Posts')
@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
  constructor(private readonly postFacade: PostFacade) {}

  @ApiOperation({ summary: 'Создание поста' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostResponse })
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

  @ApiOperation({ summary: 'Получение поста по идентификации' })
  @ApiOkResponse({ type: PostResponse })
  @Public()
  @Get(':id')
  async getPostById(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.queries.getOnePost(id);
  }

  @ApiOperation({ summary: 'Получение всех постов' })
  @ApiOkResponsePaginated(PostResponse)
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

  @ApiOperation({ summary: 'Обновление поста' })
  @ApiOkResponse({ type: PostResponse })
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

  @ApiOperation({ summary: 'Публикация поста' })
  @ApiOkResponse({ type: PostResponse })
  @Patch(':id')
  async setPublished(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.commands.setPublished(id);
  }

  @ApiOperation({ summary: 'Удаление поста' })
  @ApiOkResponse({ type: Boolean })
  @Delete(':id')
  deletePost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.commands.deletePost(id);
  }
}
