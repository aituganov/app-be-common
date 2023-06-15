import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { MultilanguageMessage } from '../responses';

export class NotFoundException extends BaseException {
  constructor(message: MultilanguageMessage = {
    en: 'Requested item not found',
    ru: 'Элемент не найден'
  }) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
