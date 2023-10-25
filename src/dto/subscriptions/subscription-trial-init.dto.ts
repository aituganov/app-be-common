import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { validationNumberMessage, validationStringMessage } from '../../validations/messages.validation';
import { FieldsValidation } from '../../validations/fields.validation';

export class SubscriptionTrialInitDTO  {
  @IsNumber({ }, validationNumberMessage)
  @Type(() => Number)
  customerId: number;

  @IsOptional()
  @IsNumber({ }, validationNumberMessage)
  @Type(() => Number)
  paymentId?: number;

  @IsOptional()
  @IsString(validationStringMessage)
  @MaxLength(FieldsValidation.Length.Description)
  description?: string;

  @IsOptional()
  @IsNumber({ }, validationNumberMessage)
  @Type(() => Number)
  tariffId?: number;
}