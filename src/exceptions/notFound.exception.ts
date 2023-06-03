import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(message = 'Requested item not found') {
    super(message, HttpStatus.NOT_FOUND);
  }
}
