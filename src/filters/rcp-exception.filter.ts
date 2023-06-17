import { Catch, ArgumentsHost, HttpException, HttpStatus, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class RcpExceptionFilter implements ExceptionFilter<RpcException> {
  catch(exception: any, host: ArgumentsHost) {
    let error: any = exception;
    try {
      error = JSON.parse(exception);
    } catch {}
    throw new HttpException(error, HttpStatus.BAD_REQUEST);
  }
}