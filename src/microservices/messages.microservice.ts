const AppMessagePrefix = { role: 'application' };
const SessionMessagePrefix = { role: 'session' };
const SubscriptionMessagePrefix = { role: 'subscription' };
const TelegramMessagePrefix = { role: 'telegram' };

export const MessageAppSubscriptionActivated = { ...AppMessagePrefix, cmd: 'subscription-activated' };
export const MessageAppSubscriptionCanceled = { ...AppMessagePrefix, cmd: 'subscription-canceled' };
export const MessageAppSubscriptionExpired = { ...AppMessagePrefix, cmd: 'subscription-expired' };

export const MessageSessionGet = { ...SessionMessagePrefix, cmd: 'get' };

export const MessageSubscriptionGetPaymentData = { ...SubscriptionMessagePrefix, cmd: 'get-payment-data' };
export const MessageSubscriptionCancel = { ...SubscriptionMessagePrefix, cmd: 'cancel' };
export const MessageSubscriptionCreate = { ...SubscriptionMessagePrefix, cmd: 'create' };

export const MessageTgGetBotInfo = { ...TelegramMessagePrefix, cmd: 'get-bot-info' };
export const MessageTgChatMemberInvite = { ...TelegramMessagePrefix, cmd: 'chat-member-invite' };
export const MessageTgChatMemberBan = { ...TelegramMessagePrefix, cmd: 'chat-member-ban' };
export const MessageTgChatCheckAccess = { ...TelegramMessagePrefix, cmd: 'chat-check-access' };
export const MessageTgMessageSend = { ...TelegramMessagePrefix, cmd: 'message-send' };