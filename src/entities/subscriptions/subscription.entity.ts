import { MaxLength } from 'class-validator';
import { Column } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { SubscriptionCreateDTO } from '../../dto/subscriptions/subscription-create.dto';
import { SubscriptionStatuses, SubscriptionTypes } from '../../types/subscription.type';
import { FieldsValidation } from '../../validations/fields.validation';

export const SubscriptionEntityName = 'subscription';

export class SubscriptionBaseEntity extends BaseEntity {
  @Column('int')
  customerId: number;

  @Column('int')
  paymentId: number;

  @Column('int')
  tariffId: number;

  @Column('enum', {
    enum: Object.values(SubscriptionTypes),
    enumName: 'subscription_types'
  })
  type: SubscriptionTypes;

  @Column('enum', {
    enum: Object.values(SubscriptionStatuses),
    enumName: 'subscription_statuses',
    default: SubscriptionStatuses.New
  })
  status: SubscriptionStatuses;

  @Column('text', { nullable: true })
  @MaxLength(FieldsValidation.Length.Reason)
  cancelationReason: string;

  @Column('text', { nullable: true })
  @MaxLength(FieldsValidation.Length.Description)
  description: string;

  @Column('timestamptz')
  tsFrom: Date;

  @Column('timestamptz')
  tsTo: Date;

  get isNew(): boolean {
    return this.status === SubscriptionStatuses.New;
  }

  get isActive(): boolean {
    return this.status === SubscriptionStatuses.Active;
  }

  get isCanceled(): boolean {
    return this.status === SubscriptionStatuses.Canceled;
  }

  get isExpired(): boolean {
    return this.status === SubscriptionStatuses.Expired;
  }

  get isPaid(): boolean {
    return this.type === SubscriptionTypes.Paid;
  }

  get isTrial(): boolean {
    return this.type === SubscriptionTypes.Trial;
  }

  protected updateConcreteFields(dto: SubscriptionCreateDTO) {
    this.customerId = dto.customerId;
    this.paymentId = dto.paymentId;
    this.tariffId = dto.tariffId;
    this.type = dto.type;
    this.status = dto.status;
    this.description = dto.description;
    this.tsFrom = dto.tsFrom;
    this.tsTo = dto.tsTo;
  }
}