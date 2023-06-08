import { ProvidersModule } from '@lib/providers';
import { Module } from '@nestjs/common';
import { SharedModule } from 'lib/shared';
import { ApiModule } from './api';

@Module({
  imports: [SharedModule, ProvidersModule, ApiModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
