import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { SubscriptionGetPaymentDataDTO } from './subscription-get-payment-data.dto';
import { validationNumberMessage, validationStringMessage } from '../../validations/messages.validation';
import { FieldsValidation } from '../../validations/fields.validation';

export class SubscriptionInitDTO extends SubscriptionGetPaymentDataDTO {
  @IsNumber({ }, validationNumberMessage)
  @Type(() => Number)
  paymentId: number;

  @IsOptional()
  @IsString(validationStringMessage)
  @MaxLength(FieldsValidation.Length.Description)
  description?: string;
}