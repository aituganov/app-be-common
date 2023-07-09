import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { MultilanguageMessage } from '../responses';

export class ConflictException extends BaseException {
  constructor(message: MultilanguageMessage = {
    en: 'Object already exist',
    ru: 'Такой объект уже существует'
  }) {
    super(message, HttpStatus.CONFLICT);
  }
}
