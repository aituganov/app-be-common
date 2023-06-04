export type BaseResponseParams<T> = {
  data?: T;
  error?: any;
};

export class BaseResponse<T> {
  success: boolean;
  error: any;
  data: T;

  constructor(params: BaseResponseParams<T>) {
    this.success = !params.error;
    this.data = params.data;
    this.error = params.error;
  }
}