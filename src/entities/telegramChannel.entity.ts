import { MaxLength } from 'class-validator';
import { Column } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum TelegramChatTypes {
  Private = 'private',
  Group =  'group',
  Supergroup = 'supergroup',
  Channel = 'channel'
}

export enum TelegramChatLimits {
  Title = 128,
  Description = 255,
  Username = 32
};

export const TelegramChatEntityName = 'telegram_chat';

export type TelegramChatParams = {
  chatId: string;
  ownerId: string;
  adminIds: string[];
  type: TelegramChatTypes;
  photo?: string;
  title: string;
  description?: string;
  username?: string;
};

export type TelegramChatBotConectParams = {
  botAdded: boolean;
  botToken?: string;
  botCanManageChat?: boolean;
  botCanChangeInfo?: boolean;
  botCanInviteUsers?: boolean;
  botCanRestrictMembers?: boolean;
  botCanPostMessages?: boolean;
};

export class TelegramChatEntity extends BaseEntity {
  @Column('bigint')
  chatId: string;

  @Column('bigint')
  ownerId: string;

  @Column('bigint', { array: true, default: [] })
  adminIds:string[];

  @Column('enum', { enum: TelegramChatTypes })
  type: TelegramChatTypes;

  @Column('text', { nullable: true })
  photo: string;
  
  @MaxLength(TelegramChatLimits.Title)
  @Column('text')
  title: string;

  @MaxLength(TelegramChatLimits.Description)
  @Column('text', { nullable: true })
  description: string;

  @MaxLength(TelegramChatLimits.Username)
  @Column('text', { nullable: true })
  username: string;

  @Column('boolean', { default: false })
  botAdded: boolean;
  
  @Column('text', { nullable: true })
  botToken: string;

  @Column('boolean', { default: false })
  botCanManageChat: boolean;

  @Column('boolean', { default: false })
  botCanChangeInfo: boolean;

  @Column('boolean', { default: false })
  botCanInviteUsers: boolean;

  @Column('boolean', { default: false })
  botCanRestrictMembers: boolean;

  @Column('boolean', { default: false })
  botCanPostMessages: boolean;

  @Column('int', { nullable: true })
  connectorId: number; // App user which connect chat through bot

  constructor(params: TelegramChatParams) {
    super();
    this.chatId = params.chatId;
    this.ownerId = params.ownerId;
    this.adminIds = params.adminIds;
    this.type = params.type;
    this.photo = params.photo;
    this.title = params.title;
    this.description = params.description;
    this.username = params.username;
  }

  botConnect(params: TelegramChatBotConectParams) {
    this.botAdded = params.botAdded;
    this.botToken = params.botToken;
    this.botCanManageChat = params.botCanManageChat || false;
    this.botCanChangeInfo = params.botCanChangeInfo || false;
    this.botCanInviteUsers = params.botCanInviteUsers || false;
    this.botCanRestrictMembers = params.botCanRestrictMembers || false;
    this.botCanPostMessages = params.botCanPostMessages || false;
  }

  setConnector(connectorId: number) {
    this.connectorId = connectorId;
  }
}
