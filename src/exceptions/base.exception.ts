import { HttpException, HttpStatus } from '@nestjs/common';
import { MultilanguageMessage } from '../responses';

export class BaseException extends HttpException {
  constructor(message: MultilanguageMessage, status: HttpStatus) {
    super(message, status);
  }
}