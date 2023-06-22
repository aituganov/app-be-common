import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsNumber, IsString, IsUrl, MaxLength } from 'class-validator';
import { FieldsValidation, validationBooleanMessage, validationBooleanTransform, validationEmailMessage, validationNumberMessage, validationStringMessage, validationUrlMessage } from '../../validations';

export class PaymentInitDTO {
  @IsNumber({ }, validationNumberMessage)
  @Type(() => Number)
  customerId: number;

  @IsNumber({ }, validationNumberMessage)
  @Type(() => Number)
  tariffId: number;

  @MaxLength(FieldsValidation.Length.Payment.Description)
  @IsString(validationStringMessage)
  description: string;

  @IsBoolean(validationBooleanMessage)
  @Transform(validationBooleanTransform)
  customerAgree: boolean;

  @MaxLength(FieldsValidation.Length.Email)
  @IsEmail({ }, validationEmailMessage)
  email: string;

  @MaxLength(FieldsValidation.Length.Pnone.Code)
  @IsString(validationStringMessage)
  phoneCode: string;

  @MaxLength(FieldsValidation.Length.Pnone.Number)
  @IsString(validationStringMessage)
  phoneNumber: string;

  @IsUrl({ require_tld: false }, validationUrlMessage)
  redirectUrlPrefix: string;
}