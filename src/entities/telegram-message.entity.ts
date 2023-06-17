import { Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { TelegramMessageDTO } from '../dto';
import { ColumnStringToNumTransformer } from '../transformers';

export enum TelegramMessageStatuses {
  Success = 'success',
  Fail =  'fail',
  Progress = 'progress'
}

export const TelegramMessageEntityName = 'telegram_message';
const idTransforer = new ColumnStringToNumTransformer();

export class TelegramMessageEntity extends BaseEntity {
  @Column('bigint', {
    transformer: idTransforer
  })
  chatId: number;

  @Column('bigint', {
    transformer: idTransforer
  })
  fromBotId: number;

  @Column('enum', {
    enum: Object.values(TelegramMessageStatuses),
    enumName: 'telegram_message_statuses'
  })
  status: TelegramMessageStatuses;

  @Column('text', { nullable: true })
  text: string;

  @Column('jsonb', { nullable: true })
  buttons: any;

  updateStatus(newStatus: TelegramMessageStatuses) {
    this.status = newStatus;
    if (this.status === TelegramMessageStatuses.Success) {
      // Clear sended additional data to keep place in DB
      this.text = null;
    }
  }

  protected updateConcreteFields(dto: TelegramMessageDTO) {
    this.chatId = dto.chatId;
    this.fromBotId = dto.fromBotId;
    this.status = dto.status;
    this.text = dto.text;
    this.buttons = dto.buttons;
  }
}