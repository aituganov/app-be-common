import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Initiator = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const initiator = ctx.switchToHttp().getRequest().user;
  if (!initiator) {
    throw new BadRequestException('Initiator not found');
  }
  return initiator;
});
