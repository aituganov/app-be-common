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

export class TelegramChatEntity extends BaseEntity {
  @Column('bigint')
  chatId: string;

  @Column('bigint')
  ownerId: string;

  @Column('bigint', { array: true, default: [] })
  adminIds:string[];

  @Column('enum', { enum: TelegramChatTypes })
  type: string;

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
}
