import { BaseError } from './base.response';

export class EventResponse<T> {
  success: boolean;
  data?: T;
  error?: BaseError;

  static createFromData<T>(data: T): EventResponse<T> {
    const rs = new EventResponse<T>();
    rs.success = true;
    rs.data = data;
    return rs;
  }

  static createFromError<T>(err: BaseError): EventResponse<T> {
    const rs = new EventResponse<T>();
    rs.success = false;
    rs.error = err;
    return rs;
  }
}