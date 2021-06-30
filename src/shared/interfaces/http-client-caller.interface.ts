import { HttpMethod } from '../enum/http-method.enum';

export interface HttpClientCallerInterface {
  call<T, B>(
    method: HttpMethod,
    url: string,
    endpoint: string,
    body?: B,
    headers?: any,
  ): Promise<T>;
}
