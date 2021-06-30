import { HttpService, Injectable } from '@nestjs/common';
import { HttpMethod } from './../../../shared/enum/http-method.enum';
import { HttpClientCallerInterface } from './../../../shared/interfaces/http-client-caller.interface';

@Injectable()
export class HttpClientCallerService implements HttpClientCallerInterface {
  constructor(private readonly httpClient: HttpService) {}
  async call<T, B>(
    _method: HttpMethod,
    _url: string,
    _endpoint: string,
    _body?: B,
    _headers?: any,
  ): Promise<T> {
    return this.httpClient
      .get<T>(`${_url}/${_endpoint}`, {
        headers: {
          apikey: '1a1e13e2-f6d9-480f-89e4-2a275116d2dd',
        },
      })
      .toPromise()
      .then(
        (res) => {
          return Promise.resolve(res.data['houses']);
        },
        (err) => {
          console.log('err', err);
          return Promise.reject(err);
        },
      );
  }
}
