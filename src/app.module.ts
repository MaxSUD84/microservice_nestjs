import { ProvidersModule } from '@lib/providers';
import { Module } from '@nestjs/common';
import { SharedModule } from 'lib/shared';
import { ApiModule } from './api';
import { DomainsModule } from './domains/domains.module';
import { ChannelsModule } from './channels/channels.module';

@Module({
  imports: [SharedModule, ProvidersModule, ApiModule, DomainsModule, ChannelsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
