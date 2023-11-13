import {
  QueueOptions,
  RabbitMQExchangeConfig,
} from '@golevelup/nestjs-rabbitmq';

export interface RabbitExchangeConfig extends RabbitMQExchangeConfig {
  name: string;
  type: 'topic' | 'direct' | 'fanout';
  options?: AssertExchange;
}

interface AssertExchange extends QueueOptions {
  durable?: boolean;
  internal?: boolean;
  autoDelete?: boolean;
  alternateExchange?: string;
  arguments?: unknown | unknown[];
}
