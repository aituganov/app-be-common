import { HttpStatus } from '@nestjs/common';
import { BaseErrorMessage, BaseException } from '..';

export class NotFoundException extends BaseException {
  constructor(message: BaseErrorMessage = {
    en: 'Requested item not found',
    ru: 'Элемент не найден'
  }) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
