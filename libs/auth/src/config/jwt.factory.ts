import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions, JwtModuleOptions } from '@nestjs/jwt';

const jwtModuleOptions = (config: ConfigService): JwtModuleOptions => ({
  secret: config.get('JWT_ACCESS_TOKEN_SECRET'),
  signOptions: {
    expiresIn: config.get('JWT_ACCESS_EXPIRES_IN', '1d'),
  },
});

// в оригинале контстанта jwtFactory
export const jwtFactory = (): JwtModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => jwtModuleOptions(config),
});
