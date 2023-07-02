const AppEventPrefix = 'app';
const SubscriptionsEventPrefix = 'subscriptions';

export const EventAppSubscriptionsToActivate = `${AppEventPrefix}-${SubscriptionsEventPrefix}-to-activate`;
export const EventAppSubscriptionsToCancel = `${AppEventPrefix}-${SubscriptionsEventPrefix}-to-cancel`;
export const EventAppSubscriptionsToExpire = `${AppEventPrefix}-${SubscriptionsEventPrefix}-to-expire`;

export const EventSubscriptionsActivate = `${SubscriptionsEventPrefix}-activate`;
export const EventSubscriptionsCancel = `${SubscriptionsEventPrefix}-cancel`;
export const EventSubscriptionsExpire = `${SubscriptionsEventPrefix}-expire`;