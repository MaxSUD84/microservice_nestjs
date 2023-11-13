import {
  CreatePostContract,
  DeletePostContract,
  SetPublishedPostContract,
  UpdatePostContract,
} from '@amqp/amqp-contracts';
import { RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { PostFacade } from 'lib/post/application-services';

@Injectable()
export class ConsumerService {
  private readonly logger = new Logger(ConsumerService.name);

  constructor(private readonly postFacade: PostFacade) {}

  @RabbitRPC({
    exchange: CreatePostContract.queue.exchange.name,
    routingKey: CreatePostContract.queue.routingKey,
    queue: CreatePostContract.queue.queue,
  })
  private async createPost(
    request: CreatePostContract.request,
  ): Promise<CreatePostContract.response> {
    const { payload: post, ...requestMessage } = request;
    try {
      const createdPost = await this.postFacade.commands.createPost(post);
      return {
        ...requestMessage,
        payload: {
          ...createdPost,
        },
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ...requestMessage,
        payload: null,
        error: this.errorHandler(error),
      };
    }
  }

  @RabbitRPC({
    exchange: UpdatePostContract.queue.exchange.name,
    routingKey: UpdatePostContract.queue.routingKey,
    queue: UpdatePostContract.queue.queue,
  })
  private async updatePost(
    request: UpdatePostContract.request,
  ): Promise<UpdatePostContract.response> {
    const { payload: post, ...requestMessage } = request;
    try {
      const updatedPost = await this.postFacade.commands.updatePost(post);
      return {
        ...requestMessage,
        payload: {
          ...updatedPost,
        },
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ...requestMessage,
        payload: null,
        error: this.errorHandler(error),
      };
    }
  }

  @RabbitRPC({
    exchange: SetPublishedPostContract.queue.exchange.name,
    routingKey: SetPublishedPostContract.queue.routingKey,
    queue: SetPublishedPostContract.queue.queue,
  })
  private async setPublishPost(
    request: SetPublishedPostContract.request,
  ): Promise<SetPublishedPostContract.response> {
    const { payload: post, ...requestMessage } = request;
    try {
      const updatedPost = await this.postFacade.commands.setPublished(post.id);
      // this.logger.verbose(updatedPost);
      return {
        ...requestMessage,
        payload: {
          code: updatedPost.isPublished ? 200 : 400,
          message: `Post with ID#${updatedPost.id} was updated.`,
        },
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ...requestMessage,
        payload: null,
        error: this.errorHandler(error),
      };
    }
  }

  @RabbitRPC({
    exchange: DeletePostContract.queue.exchange.name,
    routingKey: DeletePostContract.queue.routingKey,
    queue: DeletePostContract.queue.queue,
  })
  private async DeletePost(
    request: DeletePostContract.request,
  ): Promise<DeletePostContract.response> {
    const { payload: post, ...requestMessage } = request;
    try {
      const deletePost = await this.postFacade.commands.deletePost(post.id);
      // this.logger.verbose(updatedPost);
      return {
        ...requestMessage,
        payload: {
          code: deletePost ? 200 : 400,
          message: `Post with ID#${post.id} was deleted.`,
        },
      };
    } catch (error) {
      this.logger.error(error);
      return {
        ...requestMessage,
        payload: null,
        error: this.errorHandler(error),
      };
    }
  }

  private errorHandler(error: any) {
    return {
      code: error?.name ?? 'error',
      message: error?.message || JSON.stringify(error),
    };
  }
}
