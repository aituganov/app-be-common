export type TelegramChatMember = {
  error?: any;
  userId: number;
  chatIds: number[];
  links: string[];
  subscriptionId: number;
};

export type TelegramChatInviteResultItem = TelegramChatMember & {
  invited: boolean;
};

export type TelegramChatBanResultItem = TelegramChatMember & {
  banned: boolean;
  notified: boolean;
};

export type TelegramChatInviteResult = {
  items: TelegramChatInviteResultItem[];
}

export type TelegramChatBanResult = {
  items: TelegramChatBanResultItem[];
}