import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { env } from './../../env';
import { DBTypes } from '../enum/db-types.enum';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: DBTypes.mysql,
      host: configService.get(env.db.host),
      port: configService.get(env.db.port.toString()),
      username: configService.get(env.db.username),
      password: configService.get(env.db.password),
      database: configService.get(env.db.username),
      entities: [__dirname + '/modules/**/models/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    };
  }
}

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
  inject: [ConfigService],
};
