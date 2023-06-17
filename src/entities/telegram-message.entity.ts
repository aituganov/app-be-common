import { BaseEntity, Column } from 'typeorm';

export enum TelegramMessageStatuses {
  Success = 'success',
  Fail =  'fail',
  Progress = 'progress'
}

export const TelegramMessageEntityName = 'telegram_message';

export class TelegramMessageEntity extends BaseEntity {
  @Column('bigint')
  chatId: string;

  @Column('enum', {
    enum: Object.values(TelegramMessageStatuses),
    enumName: 'telegram_message_statuses'
  })
  status: TelegramMessageStatuses;

  @Column('jsonb')
  sendConfiguration: string;
}