import { IsOptional, IsString, MaxLength } from 'class-validator';
import { FieldsValidation, validationStringMessage, validationLengthMaxMessage } from '../../validations';

export class MailerSendDTO {
  @IsString(validationStringMessage)
  @MaxLength(FieldsValidation.Length.Email.Address, validationLengthMaxMessage)
  to: string;
  
  @IsString(validationStringMessage)
  @MaxLength(FieldsValidation.Length.Email.Subject, validationLengthMaxMessage)
  subject: string;

  @IsOptional()
  @IsString(validationStringMessage)
  @MaxLength(FieldsValidation.Length.Email.Address, validationLengthMaxMessage)
  from?: string;

  @IsOptional()
  @IsString(validationStringMessage)
  @MaxLength(FieldsValidation.Length.Email.Body, validationLengthMaxMessage)
  text?: string;

  @IsOptional()
  @IsString(validationStringMessage)
  @MaxLength(FieldsValidation.Length.Email.Body, validationLengthMaxMessage)
  html?: string;
}