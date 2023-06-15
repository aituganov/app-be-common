import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { MultilanguageMessage } from '../responses';

export class BadRequestException extends BaseException {
  constructor(message: MultilanguageMessage = {
    en: 'Bad request',
    ru: 'Некорректный запрос'
  }) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
