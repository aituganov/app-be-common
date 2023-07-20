import { BaseError, BaseResponse } from './base.response';

export type ListResponseParams<T> = {
  items: T[];
  count: number;
  map?: { [id: string]: any };
};

export class ListResponse<T> extends BaseResponse<ListResponseParams<T>> {
  data: ListResponseParams<T>;

  constructor(data?: ListResponseParams<T>, error?: BaseError) {
    super({
      data,
      error
    });
  }

  static makeEmptyResponse(): ListResponse<any> {
    return new ListResponse({
      items: [],
      count: 0
    });
  }
}