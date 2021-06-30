import { HttpModule, Module } from '@nestjs/common';
import { HttpClientCallerService } from './services/http-client-caller/http-client-caller.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [HttpClientCallerService],
  exports: [HttpClientCallerService],
})
export class SharedModule {}
