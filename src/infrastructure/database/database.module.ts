import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import knex from 'knex';
import knexConfig from '../../../knexfile';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'KnexConnection',
      useFactory: (configService: ConfigService) => {
        const environment = configService.get<string>('NODE_ENV') || 'test';
        return knex(knexConfig[environment]);
      },
      inject: [ConfigService],
    },
  ],
  exports: ['KnexConnection'],
})
export class DatabaseModule {}
