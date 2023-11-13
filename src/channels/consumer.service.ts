import { CreatePostContract } from '@amqp/amqp-contracts';
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
      const createdPost = this.postFacade.commands.createPost(post);

      return {
        ...requestMessage,
        payload: createdPost,
      };
    } catch (error) {
      this.logger.error(error);
      return null;
    }
  }
}
