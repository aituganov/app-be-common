import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { SubscriptionCheckTrialDTO } from './subscription-check-trial.dto';
import { validationNumberMessage, validationStringMessage } from '../../validations/messages.validation';
import { FieldsValidation } from '../../validations/fields.validation';

export class SubscriptionInitDTO extends SubscriptionCheckTrialDTO {
  @IsNumber({ }, validationNumberMessage)
  @Type(() => Number)
  paymentId: number;

  @IsOptional()
  @IsString(validationStringMessage)
  @MaxLength(FieldsValidation.Length.Description)
  description?: string;
}