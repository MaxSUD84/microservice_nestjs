import { EXCHANGE_POST } from '@amqp/amqp-contracts/exchanges';
import {
  AmqpBaseRequest,
  AmqpBaseResponse,
  QueueDeclaration,
} from '@amqp/amqp-contracts/shared';
import { IdentPostRequest, PostResponse } from './interfaces';

export namespace GetPostContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_POST,
    queue: `${EXCHANGE_POST.name}-get`,
    routingKey: `${EXCHANGE_POST.name}-get`,
    queueOptions: {
      durable: true,
    },
  };

  export type request = AmqpBaseRequest<IdentPostRequest>;

  export type response = AmqpBaseResponse<PostResponse>;
}
