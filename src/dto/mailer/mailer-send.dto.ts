import { IsOptional, IsString, MaxLength } from 'class-validator';
import { FieldsValidation, validationStringMessage, validationLengthMaxMessage } from '../../validations';

export class MailerSendDTO {
  @IsString(validationStringMessage)
  @MaxLength(FieldsValidation.Length.Email, validationLengthMaxMessage)
  to: string;

  @IsOptional()
  @IsString(validationStringMessage)
  @MaxLength(FieldsValidation.Length.Email, validationLengthMaxMessage)
  from?: string;

  @IsOptional()
  @IsString(validationStringMessage)
  @MaxLength(FieldsValidation.Length.EmailBody, validationLengthMaxMessage)
  text?: string;

  @IsOptional()
  @IsString(validationStringMessage)
  @MaxLength(FieldsValidation.Length.EmailBody, validationLengthMaxMessage)
  html?: string;
}