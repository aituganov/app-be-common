import { HttpException, HttpStatus } from '@nestjs/common';
import { BaseErrorMessage } from '../responses';

export class BaseException extends HttpException {
  constructor(message: BaseErrorMessage, status: HttpStatus) {
    super(message, status);
  }
}