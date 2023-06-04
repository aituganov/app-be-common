import { BaseResponse } from './base.response';

export type ListResponsParams<T> = {
  items?: T;
  count: 0;
  map?: { [id: string]: any };
};

export class ListResponse<T> extends BaseResponse<ListResponsParams<T>> {
  data: ListResponsParams<T>;

  constructor(data: ListResponsParams<T>, error?: any) {
    super({
      data,
      error
    });
  }
}