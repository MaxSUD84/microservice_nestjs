import {
  RabbitMQConfig,
  RabbitMQExchangeConfig,
} from '@golevelup/nestjs-rabbitmq';
import { ConfigService } from '@nestjs/config';

const AMQP_EXCHANGES: RabbitMQExchangeConfig[] = [
  {
    name: 'post',
    type: 'direct',
  },
];

export const amqpConfig = (configServise: ConfigService): RabbitMQConfig => {
  const uri = configServise.get('AMQP_URI');
  if (!uri) {
    throw new Error(`'AMQP_URI' not found. Check .env!`);
  }

  return {
    exchanges: AMQP_EXCHANGES,
    uri,
    connectionInitOptions: { wait: false },
    connectionManagerOptions: {
      heartbeatIntervalInSeconds: 15,
      reconnectTimeInSeconds: 30,
    },
  };
};
