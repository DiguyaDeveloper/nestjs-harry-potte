import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HogwartsModule } from './modules/hogwarts/hogwarts.module';
import { CharactersModule } from './modules/characters/characters.module';
import { CharactersController } from './modules/characters/controller/characters.controller';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from './env';
import { DBTypes } from './shared/enum/db-types.enum';
import { Connection } from 'typeorm';

const { combine, printf, colorize } = winston.format;

const customFormat = printf((info) => {
  const level = `[${info.level.toUpperCase()}]`.padEnd(9, ' ');
  const source = '';
  const log = `${info.timestamp} ${source}${level}${info.message}`;
  return info.stack ? `${log}\n${info.stack}` : log;
});

@Module({
  imports: [
    HogwartsModule,
    CharactersModule,
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'isoDateTime' }),
        winston.format.json(),
        winston.format.colorize({ all: true }),
      ),
      transports: [
        new winston.transports.Console({
          format: combine(customFormat, colorize({ all: true })),
        }),
        new winston.transports.File({
          format: customFormat,
          maxsize: 10000000,
          filename: 'error.log',
          level: 'error',
          zippedArchive: true,
          handleExceptions: true,
        }),
      ],
    }),
    TypeOrmModule.forRoot({
      host: env.db.host,
      type: DBTypes.mysql,
      database: env.db.database,
      password: env.db.password,
      username: env.db.username,
      entities: [__dirname + '/modules/**/models/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: 'all',
      // Logger: new CustomTypeOrmLogger(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
