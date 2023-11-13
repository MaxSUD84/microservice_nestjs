import { Module } from '@nestjs/common';
import { AmqpContractsService } from './amqp-contracts.service';

@Module({
  providers: [AmqpContractsService],
  exports: [AmqpContractsService],
})
export class AmqpContractsModule {}
