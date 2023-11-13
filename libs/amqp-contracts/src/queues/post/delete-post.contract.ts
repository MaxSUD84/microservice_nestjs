import { EXCHANGE_POST } from '@amqp/amqp-contracts/exchanges';
import {
  AmqpBaseRequest,
  AmqpBaseResponse,
  QueueDeclaration,
} from '@amqp/amqp-contracts/shared';
import { IdentPostRequest, SimpleResponse } from './interfaces';

export namespace DeletePostContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_POST,
    queue: `${EXCHANGE_POST.name}-delete`,
    routingKey: `${EXCHANGE_POST.name}-delete`,
    queueOptions: {
      durable: true,
    },
  };

  export type request = AmqpBaseRequest<IdentPostRequest>;

  export type response = AmqpBaseResponse<SimpleResponse>;
}
