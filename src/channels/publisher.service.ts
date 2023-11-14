import {
  GetPostContract,
  GetPublishedPostContract,
} from '@amqp/amqp-contracts';
import {
  AmqpConnection,
  RabbitRPC,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import { PostFacade } from 'lib/post/application-services';

interface PubMessageModel {
  payload: {
    id: string;
  };
}

@Injectable()
export class PublisherService {
  private readonly logger = new Logger(PublisherService.name);

  constructor(
    private readonly postFacade: PostFacade,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  @RabbitSubscribe({
    exchange: GetPostContract.queue.exchange.name,
    routingKey: GetPostContract.queue.routingKey,
    queue: GetPostContract.queue.queue,
  })
  private async GetPostSubscribe(request: GetPostContract.request) {
    const { payload: post, ...requestMessage } = request;
    try {
      const getPost = await this.postFacade.queries.getOnePost(post.id);
      this.logger.verbose(`${JSON.stringify(getPost)}`);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @RabbitRPC({
    exchange: GetPublishedPostContract.queue.exchange.name,
    routingKey: GetPublishedPostContract.queue.routingKey,
    queue: GetPublishedPostContract.queue.queue,
  })
  private async GetPublishedPost(request: GetPublishedPostContract.request) {
    const { ...requestMessage } = request;
    try {
      const getPubPost = await this.postFacade.queries.getAllPosts({
        offset: 0,
        limit: 15,
      });

      if (getPubPost[1] > 0) {
        for (const post of getPubPost[0]) {
          await this.amqpConnection.publish<PubMessageModel>(
            GetPostContract.queue.exchange.name,
            GetPostContract.queue.routingKey,
            {
              payload: {
                id: post.id,
              },
            },
            {
              fields: {
                deliveryTag: 2,
              },
              properties: {
                deliveryMode: 'persistent',
              },
            },
          );
        }
        this.logger.verbose(
          `GetPublishedPostContract was finished: ${getPubPost[1]} post found.`,
        );
      }
      return {
        ...requestMessage,
        payload: {
          message: `${getPubPost[1]} post found.`,
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
