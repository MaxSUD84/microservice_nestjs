import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionnsFilter } from './filters';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionnsFilter,
    },
  ],
})
export class SharedModule {}
