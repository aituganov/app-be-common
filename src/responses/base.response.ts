export type BaseErrorMessage = {
  en: string;
  ru: string;
}

export type BaseError = {
  message: BaseErrorMessage;
  origin?: string;
  data?: any;
};

export type BaseResponseParams<T> = {
  data?: T;
  error?: BaseError;
};

export class BaseResponse<T> {
  success: boolean;
  error: BaseError;
  data: T;

  constructor(params: BaseResponseParams<T>) {
    this.success = !params.error;
    this.data = params.data;
    this.error = params.error;
  }
}