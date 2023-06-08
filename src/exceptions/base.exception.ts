import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseErrorMessage } from '..';

export class BaseException extends HttpException {
  constructor(message: BaseErrorMessage, status: HttpStatus) {
    super(message, status);
  }
}