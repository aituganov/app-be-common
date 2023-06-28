import { IsString, MaxLength } from 'class-validator';
import { SubscriptionInitDTO } from './subscription-init.dto';
import { FieldsValidation } from '../../validations/fields.validation';
import { validationLengthMaxMessage, validationStringMessage } from '../../validations/messages.validation';

export class SubscriptionCancelDTO extends SubscriptionInitDTO {
  @IsString(validationStringMessage)
  @MaxLength(FieldsValidation.Length.Reason, validationLengthMaxMessage)
  reason: string;
}