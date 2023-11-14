import { EXCHANGE_POST } from '@amqp/amqp-contracts/exchanges';
import {
  AmqpBaseRequest,
  AmqpBaseResponse,
  QueueDeclaration,
} from '@amqp/amqp-contracts/shared';
import { PostResponse } from './interfaces';

export namespace GetPublishedPostContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_POST,
    queue: `${EXCHANGE_POST.name}-get-published`,
    routingKey: `${EXCHANGE_POST.name}-get-published`,
    queueOptions: {
      durable: true,
      // autoDelete: true,
    },
  };

  export type request = AmqpBaseRequest<undefined>;

  export type response = AmqpBaseResponse<PostResponse>;
}
