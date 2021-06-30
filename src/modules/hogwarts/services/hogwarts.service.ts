import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { HttpMethod } from './../../../shared/enum/http-method.enum';
import { HttpClientCallerService } from './../../../shared/services/http-client-caller/http-client-caller.service';
import { Logger } from 'winston';
import { Houses } from '../models/houses';

@Injectable()
export class HogwartsService {
  url = 'http://us-central1-rh-challenges.cloudfunctions.net';
  endpoint = 'potterApi/houses';

  constructor(
    private readonly httpClientCallerService: HttpClientCallerService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async getHogwartsHouses(): Promise<Houses[]> {
    let houses: Houses[];
    try {
      this.logger.info('Calling getHello()', {
        controller: HogwartsService.name,
      });

      await this.httpClientCallerService
        .call<Houses[], unknown>(HttpMethod.GET, this.url, this.endpoint, {})
        .then((response: Houses[]) => {
          console.log('alow', response);
          houses = response;
        });
      return houses;
    } catch (error) {
      console.log('error', error);
      this.logger.error('Get houses');
    }
  }
}
