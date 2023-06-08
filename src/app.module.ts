import { ProvidersModule } from '@lib/providers';
import { Module } from '@nestjs/common';
import { SharedModule } from 'lib/shared';
import { ApiModule } from './api';
import { DomainsModule } from './domains/domains.module';

@Module({
  imports: [SharedModule, ProvidersModule, ApiModule, DomainsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
