import { ClientProviderOptions } from '@nestjs/microservices';
import { Microservices } from '..';

export const prepareMicroserviceConfig = (name: Microservices, port: number): ClientProviderOptions => {
  return {
    name,
    options : {
      port
    }
  };
}