import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PostResponse, PaginatedPosts } from '../responses';
import { PostFacade } from 'lib/post/application-services';
import { PaginationDto } from 'lib/shared';
import { plainToClass } from 'class-transformer';
import { CreatePostInput } from '../inputs';
import { v4 } from 'uuid';

@Resolver(() => PostResponse)
export class PostResolver {
  constructor(private readonly postFacade: PostFacade) {}

  @Query(() => PostResponse, { name: 'postById' })
  async getPostById(@Args('id') id: string) {
    return this.postFacade.queries.getOnePost(id);
  }

  @Query(() => PaginatedPosts, { name: 'posts' })
  async getPosts(@Args() paginationDto: PaginationDto) {
    const pagination = plainToClass(PaginationDto, paginationDto);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //  @ts-ignore
    const [data, total] = await this.postFacade.queries.getAllPosts(pagination);
    return {
      ...pagination,
      data,
      total,
    };
  }

  @Mutation(() => PostResponse)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    return this.postFacade.commands.createPost({
      ...createPostInput,
      authorId: v4(),
    });
  }

  @Mutation(() => PostResponse)
  async setPublichedPost(@Args('id') id: string) {
    return this.postFacade.commands.setPublished(id);
  }
}
