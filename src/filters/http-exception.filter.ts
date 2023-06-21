import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  protected readonly  logger: Logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<any>();
    const request = ctx.getRequest<any>();
    const status = exception.getStatus();
    const error = exception.getResponse() || exception.message;

    this.logger.error(`Catch error, status=${status} ${JSON.stringify(error)}`);

    response
      .status(status)
      .send({
        error,
        timestamp: new Date().toISOString(),
        path: request.url
      });
  }
}