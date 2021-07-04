import { HttpModule, Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { HttpClientCallerService } from './services/http-client-caller/http-client-caller.service';
import * as winston from 'winston';

const { combine, printf, colorize } = winston.format;

const customFormat = printf((info) => {
  const level = `[${info.level.toUpperCase()}]`.padEnd(9, ' ');
  const source = '';
  const log = `${info.timestamp} ${source}${level}${info.message}`;
  return info.stack ? `${log}\n${info.stack}` : log;
});

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
        winston.format.colorize({
          colors: {
            info: 'blue',
            warn: 'yellow',
            debug: 'blue',
          },
        }),
        winston.format.printf(
          (info) =>
            `${info.level}: ${info.label}: ${[info.timestamp]}: ${
              info.message
            }`,
        ),
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
  ],
  providers: [HttpClientCallerService],
  exports: [HttpClientCallerService],
})
export class SharedModule {}
