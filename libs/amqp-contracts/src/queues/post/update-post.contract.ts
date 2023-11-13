import { EXCHANGE_POST } from '@amqp/amqp-contracts/exchanges';
import {
  AmqpBaseRequest,
  AmqpBaseResponse,
  QueueDeclaration,
} from '@amqp/amqp-contracts/shared';
import { PostResponse, UpdatePostRequest } from './interfaces';

export namespace UpdatePostContract {
  export const queue: QueueDeclaration = {
    exchange: EXCHANGE_POST,
    queue: `${EXCHANGE_POST.name}-update`,
    routingKey: `${EXCHANGE_POST.name}-update`,
    queueOptions: {
      durable: true,
    },
  };

  export type request = AmqpBaseRequest<UpdatePostRequest>;

  export type response = AmqpBaseResponse<PostResponse>;
}
