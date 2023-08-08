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

export const prepareMicroserviceConfig = (name: Microservices, port: number): ClientProviderOptions => {
  return {
    name,
    options : {
      port
    }
  };
}
