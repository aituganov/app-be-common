import { IsString, MaxLength } from 'class-validator';
import { FieldsValidation, validationStringMessage, validationLengthMaxMessage } from '../../validations';

export class SmsSendDTO {
  @IsString(validationStringMessage)
  @MaxLength(FieldsValidation.Length.SMS.Phone, validationLengthMaxMessage)
  phone: string;
  
  @IsString(validationStringMessage)
  @MaxLength(FieldsValidation.Length.SMS.Text, validationLengthMaxMessage)
  text: string;

  @IsString(validationStringMessage)
  @MaxLength(FieldsValidation.Length.SMS.SenderName, validationLengthMaxMessage)
  senderName: string;
}