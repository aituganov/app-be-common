import { Injectable, CanActivate, ExecutionContext, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MessageSessionGet, Microservices } from '..';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    @Inject(Microservices.Auth) private readonly client: ClientProxy,
    @Inject(Logger) private readonly logger: Logger
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    this.logger.debug('Try to check session from cookies through auth microservice...');
    const session = await firstValueFrom(this.client.send(MessageSessionGet, request.cookies));
    this.logger.debug(`Ready! Got ${JSON.stringify(session)}`);
    request.user = session?.user;
    return !!session;
  }
}