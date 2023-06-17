import { MaxLength } from 'class-validator';
import { Column } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { PaymentReceiptDTO } from '../../dto';
import { FieldsValidation } from '../../validations';

export const PaymentReceiptDataEntityName = 'payment_receipt_data';

export class PaymentReceiptDataEntity extends BaseEntity {
  @Column()
  ownerId: number;

  @MaxLength(FieldsValidation.Length.Email)
  @Column('text', { nullable: true })
  email: string;

  @Column('boolean', { default: false })
  emailIsConfirmed: boolean;

  @MaxLength(FieldsValidation.Length.Pnone.Code)
  @Column({ type: 'text', nullable: true })
  phoneCode: string;

  @MaxLength(FieldsValidation.Length.Pnone.Number)
  @Column({ type: 'text', nullable: true })
  phoneNumber: string;

  @Column('boolean', { default: false })
  phoneIsConfirmed: boolean;

  @Column('boolean', { default: true })
  userAgreeWithTerms: boolean;

  protected updateConcreteFields(dto: PaymentReceiptDTO) {
    this.ownerId = dto.ownerId;
    this.email = dto.email;
    this.phoneCode = dto.phoneCode;
    this.phoneNumber = dto.phoneNumber;
  }

  confirmEmail() {
    this.emailIsConfirmed = true;
  }

  confirmPhone() {
    this.phoneIsConfirmed = true;
  }
}