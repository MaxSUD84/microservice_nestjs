import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus, EventBus } from '@nestjs/cqrs';
import { CreatePostDto, UpdatePostDto } from './commands/dto';
import {
  CreatePostCommand,
  CreatePostCommandHandler,
  DeletePostCommand,
  DeletePostCommandHandler,
  SetPublishedCommand,
  SetPublishedCommandHandler,
  UpdatePostCommand,
  UpdatePostCommandHandler,
} from './commands';
import {
  GetPostQuery,
  GetPostQueryHandler,
  GetPostsQuery,
  GetPostsQueryHandler,
} from './queries';
import { PaginationDto } from 'lib/shared/dto';

@Injectable()
export class PostFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  commands = {
    createPost: (post: CreatePostDto) => this.createPost(post),
    updatePost: (post: UpdatePostDto) => this.updatePost(post),
    setPublished: (id: string) => this.setPublished(id),
    deletePost: (id: string) => this.deletePost(id),
  };
  queries = {
    getOnePost: (id: string) => this.getPost(id),
    getAllPosts: (pagination: PaginationDto) => this.getPosts(pagination),
  };
  events = {};

  private createPost(post: CreatePostDto) {
    return this.commandBus.execute<
      CreatePostCommand,
      Awaited<ReturnType<CreatePostCommandHandler['execute']>>
    >(new CreatePostCommand(post));
  }
  private updatePost(post: UpdatePostDto) {
    return this.commandBus.execute<
      UpdatePostCommand,
      Awaited<ReturnType<UpdatePostCommandHandler['execute']>>
    >(new UpdatePostCommand(post));
  }
  private setPublished(id: string) {
    return this.commandBus.execute<
      SetPublishedCommand,
      Awaited<ReturnType<SetPublishedCommandHandler['execute']>>
    >(new SetPublishedCommand(id));
  }
  private deletePost(id: string) {
    return this.commandBus.execute<
      DeletePostCommand,
      Awaited<ReturnType<DeletePostCommandHandler['execute']>>
    >(new DeletePostCommand(id));
  }

  private getPost(id: string) {
    return this.queryBus.execute<
      GetPostQuery,
      Awaited<ReturnType<GetPostQueryHandler['execute']>>
    >(new GetPostQuery(id));
  }

  private getPosts(pagination: PaginationDto) {
    return this.queryBus.execute<
      GetPostsQuery,
      Awaited<ReturnType<GetPostsQueryHandler['execute']>>
    >(new GetPostsQuery(pagination));
  }
}
