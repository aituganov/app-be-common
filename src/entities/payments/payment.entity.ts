import { Max, MaxLength, Min } from 'class-validator';
import { Column } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { paymentColumnOpts } from '../../constants/payment.constant';
import { PaymentCreateDTO } from '../../dto';
import { AvailableCurrencies, PaymentReceiptStatuses, PaymentStatuses } from '../../types';
import { FieldsValidation } from '../../validations';
import { PaymentMethodEntity } from './payment-method.entity';

export const PaymentEntityName = 'payment';

export abstract class PaymentEntity extends BaseEntity {
  @Column('text', { nullable: true })
  providerId: string;

  @Column('int')
  customerId: number;

  @Column('boolean', { default: true })
  customerAgreeWithTerms: boolean;

  @Column('int')
  tariffId: number;

  @Column('int', { nullable: true })
  parentPaymentId: number;

  @MaxLength(FieldsValidation.Length.Email)
  @Column('text', { nullable: true })
  email: string;

  @MaxLength(FieldsValidation.Length.Pnone.Code)
  @Column('text', { nullable: true })
  phoneCode: string;

  @MaxLength(FieldsValidation.Length.Pnone.Number)
  @Column('text', { nullable: true })
  phoneNumber: string;

  @Column('enum', {
    enum: Object.values(PaymentStatuses),
    enumName: 'payment_statuses',
    default: PaymentStatuses.Pending
  })
  status: PaymentStatuses;

  @MaxLength(FieldsValidation.Length.Error)
  @Column('text', { nullable: true })
  errorMessage: string;

  @Column(paymentColumnOpts)
  @Min(FieldsValidation.Price.Min)
  @Max(FieldsValidation.Price.Max)
  amount: number;

  @Column('enum', {
    enum: Object.values(AvailableCurrencies),
    enumName: 'avalable_currencies',
    nullable: true
  })
  currency: string;

  @Column('text')
  description: string;

  @Column('timestamptz', { nullable: true })
  expiresAt: Date;

  @Column(paymentColumnOpts)
  @Min(FieldsValidation.Price.Min)
  @Max(FieldsValidation.Price.Max)
  incomeAmount: number;

  @Column('enum', {
    enum: Object.values(AvailableCurrencies),
    enumName: 'avalable_currencies',
    nullable: true
  })
  incomeCurrency: string;

  @Column('text', { nullable: true })
  refundId: string;

  @Column('timestamptz', { nullable: true })
  refundedAt: Date;

  @Column(paymentColumnOpts)
  @Min(FieldsValidation.Price.Min)
  @Max(FieldsValidation.Price.Max)
  refundedAmount: number;

  @Column('enum', {
    enum: Object.values(AvailableCurrencies),
    enumName: 'avalable_currencies',
    nullable: true
  })
  refundedCurrency: string;

  @Column('enum', {
    enum: Object.values(PaymentReceiptStatuses),
    enumName: 'payment_receipt_statuses',
    default: PaymentReceiptStatuses.Pending
  })
  receiptStatus: PaymentReceiptStatuses;

  @Column('boolean', { nullable: true })
  test: boolean;

  @Column('boolean', { default: false })
  paid: boolean;

  @Column('boolean', { nullable: true })
  refundable: boolean;

  protected updateConcreteFields(dto: PaymentCreateDTO) {
    this.parentPaymentId = dto.parentPaymentId;
    this.customerId = dto.customerId;
    this.customerAgreeWithTerms = dto.customerAgree;
    this.tariffId = dto.tariffId;
    this.email = dto.email;
    this.phoneCode = dto.phoneCode;
    this.phoneNumber = dto.phoneNumber;
    this.amount = dto.amount;
    this.currency = dto.currency;
    this.description = dto.description;
  }

  abstract parseCurrencyFromProvider(currency: string): void;
  abstract parseReceiptStatusFromProvider(receiptStatus: string): void;
  abstract parseStatusFromProvider(status: string): void;
  abstract prepareCurrencyForProvider(): string;
  abstract updateFromProviderData(data: any, paymentMethods: PaymentMethodEntity): void;
}