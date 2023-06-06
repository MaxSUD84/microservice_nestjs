import { ProvidersModule } from '@lib/providers';
import { Module } from '@nestjs/common';
import { SharedModule } from 'lib/shared';

@Module({
  imports: [SharedModule, ProvidersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
