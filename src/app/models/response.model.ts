import { ResponseCode } from './response-code.enum';

export interface Response<T> {
  statusCode: ResponseCode;
  data: T;
  errorMessage?: string;
}
