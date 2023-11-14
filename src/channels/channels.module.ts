import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { PublisherService } from './publisher.service';

@Module({
  providers: [ConsumerService, PublisherService],
})
export class ChannelsModule {}
