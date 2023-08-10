import { ClientProviderOptions } from '@nestjs/microservices';

export * from './events.microservices';
export * from './messages.microservice';

export enum Microservices {
  AppMain = 'APP_MAIN_MIC',
  Auth = 'AUTH_MIC',
  Mailer = 'MAIL_MIC',
  Payment = 'PAY_MIC',
  SMS = 'SMS_MIC',
  Subscription = 'SUB_MIC',
  Telegram = 'TG_MIC'
};

export const prepareMicroserviceConfig = (name: Microservices, port: number, host = '127.0.0.1'): ClientProviderOptions => {
  return {
    name,
    options : {
      host,
      port
    }
  };
}

export const prepareMicroserviceConfigFromUrl = (name: Microservices, url: string): ClientProviderOptions => {
  const parts = url.split(':');
  return prepareMicroserviceConfig(name, +parts[1], parts[0]);
}
