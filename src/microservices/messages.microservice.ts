const AppMessagePrefix = { role: 'application' };
const MailMessagePrefix = { role: 'mailer' };
const SessionMessagePrefix = { role: 'session' };
const PaymentMessagePrefix = { role: 'payment' };
const SubscriptionMessagePrefix = { role: 'subscription' };
const TelegramMessagePrefix = { role: 'telegram' };
const UserMessagePrefix = { role: 'user' };

export const MessageMailSend = { ...MailMessagePrefix, cmd: 'send' };

export const MessageSessionGet = { ...SessionMessagePrefix, cmd: 'get' };
export const MessageUserGetMapByIds = { ...UserMessagePrefix, cmd: 'get-map-by-ids' };

export const MessagePaymentsRepeat = { ...PaymentMessagePrefix, cmd: 'items-repeat' };

export const MessageSubscriptionGetPaymentData = { ...SubscriptionMessagePrefix, cmd: 'get-payment-data' };
export const MessageSubscriptionCancel = { ...SubscriptionMessagePrefix, cmd: 'cancel' };
export const MessageSubscriptionCreate = { ...SubscriptionMessagePrefix, cmd: 'create' };
export const MessageSubscriptionGet = { ...SubscriptionMessagePrefix, cmd: 'get' };

export const MessageTgGetBotInfo = { ...TelegramMessagePrefix, cmd: 'get-bot-info' };
export const MessageTgChatMemberInvite = { ...TelegramMessagePrefix, cmd: 'chat-member-invite' };
export const MessageTgChatMemberBan = { ...TelegramMessagePrefix, cmd: 'chat-member-ban' };
export const MessageTgChatCheckAccess = { ...TelegramMessagePrefix, cmd: 'chat-check-access' };
export const MessageTgMessageSend = { ...TelegramMessagePrefix, cmd: 'message-send' };
