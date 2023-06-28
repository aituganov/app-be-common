import { TariffBaseEntity } from '..';

export enum SubscriptionStatuses {
  New = 'new',
  Active = 'active',
  Canceled = 'canceled',
  Expired = 'expired'
};

export enum SubscriptionTypes {
  Paid = 'paid',
  Trial = 'trial'
};

export type SubscriptionPaymentData = {
  subscriptionType: SubscriptionTypes;
  tariff: TariffBaseEntity;
}