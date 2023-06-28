import { Injectable, CanActivate, ExecutionContext, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Microservices } from '../constants/microservice.constant';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(
    @Inject(Microservices.Auth) private readonly client: ClientProxy,
    @Inject(Logger) private readonly logger: Logger
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.error(request);
    this.logger.debug('Try to check session from cookies through auth microservice...');
    const session = await firstValueFrom(this.client.send({ role: 'session', cmd: 'get' }, request.cookies));
    this.logger.debug(`Ready! Got ${JSON.stringify(session)}`);
    request.user = session?.user;
    return !!session;
  }
}