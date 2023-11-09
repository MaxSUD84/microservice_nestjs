import { Resolver, Query, Args } from '@nestjs/graphql';
import { PostResponse } from '../responses/post.response';
import { PostFacade } from 'lib/post/application-services';

@Resolver(() => PostResponse)
export class PostResolver {
  constructor(private readonly postFacade: PostFacade) {}
  @Query(() => PostResponse, { name: 'postById' })
  async getPostById(@Args('id') id: string) {
    return this.postFacade.queries.getOnePost(id);
  }
}
