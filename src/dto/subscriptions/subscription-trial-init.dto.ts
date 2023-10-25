import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { validationBooleanMessage, validationNumberMessage, validationStringMessage } from '../../validations/messages.validation';
import { FieldsValidation, validationBooleanTransform } from '../../validations/fields.validation';
import { SubscriptionGetPaymentDataDTO } from './subscription-get-payment-data.dto';

export class SubscriptionTrialInitDTO  extends SubscriptionGetPaymentDataDTO {
  @IsBoolean(validationBooleanMessage)
  @Transform(validationBooleanTransform)
  checkByTariff: boolean;

  @IsOptional()
  @IsNumber({ }, validationNumberMessage)
  @Type(() => Number)
  paymentId?: number;

  @IsOptional()
  @IsString(validationStringMessage)
  @MaxLength(FieldsValidation.Length.Description)
  description?: string;
}