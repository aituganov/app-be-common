import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { BaseErrorMessage } from '../responses';

export class BadRequestException extends BaseException {
  constructor(message: BaseErrorMessage = {
    en: 'Bad request',
    ru: 'Некорректный запрос'
  }) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
