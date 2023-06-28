import { Column } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { PaymentMethodTypes } from '../../types';
import { PaymentMethodDTO } from '../../dto/payments/payment-method.dto';

export const PaymentMethodEntityName = 'payment_method';

export class PaymentMethodBaseEntity extends BaseEntity {
  @Column('text')
  methodId: string;

  @Column('enum', {
    enum: Object.values(PaymentMethodTypes),
    enumName: 'payment_method_types'
  })
  type: PaymentMethodTypes;

  @Column('boolean')
  saved: boolean;

  @Column('text')
  title: string;

  // Alfa
  @Column('text', { nullable: true })
  login: string;

  // Card
  @Column('text', { nullable: true })
  cardFirsPart: string;

  @Column('text', { nullable: true })
  cardLastPart: string;

  @Column('text', { nullable: true })
  cardExpYear: string;

  @Column('text', { nullable: true })
  cardExpMonth: string;

  @Column('text', { nullable: true })
  cardType: string;

  @Column('text', { nullable: true })
  cardIssuerCountry: string;

  // Yoo money
  @Column('text', { nullable: true })
  accountNumber: string;

  protected updateConcreteFields(dto: PaymentMethodDTO) {
    this.methodId = dto.id;
    this.type = dto.type;
    this.saved = dto.saved;
    this.title = dto.title;
    this.login = dto.login;
    this.cardFirsPart = dto.cardFirsPart;
    this.cardLastPart = dto.cardLastPart;
    this.cardExpYear = dto.cardExpYear ? dto.cardExpYear.toString() : null;
    this.cardExpMonth = dto.cardExpMonth ? dto.cardExpMonth.toString() : null;
    this.cardType = dto.cardType;
    this.cardIssuerCountry = dto.cardIssuerCountry;
    this.accountNumber = dto.accountNumber;
  }
}