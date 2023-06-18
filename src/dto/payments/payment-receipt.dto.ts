import { IsBoolean, IsBooleanString, IsEmail, IsString, MaxLength } from 'class-validator';
import { IBaseEntityDTOCreate } from '../../interfaces';
import { FieldsValidation, validationBooleanMessage, validationStringMessage } from '../../validations';
import { Transform } from 'class-transformer';

export class PaymentReceiptDTO implements IBaseEntityDTOCreate {
  @IsString(validationStringMessage)
  ownerId: string;
  
  @IsString(validationStringMessage)
  tariffId: string;

  @MaxLength(FieldsValidation.Length.Email)
  @IsEmail({ },validationStringMessage)
  email: string;

  @MaxLength(FieldsValidation.Length.Pnone.Code)
  @IsString(validationStringMessage)
  phoneCode: string;

  @MaxLength(FieldsValidation.Length.Pnone.Number)
  @IsString(validationStringMessage)
  phoneNumber: string;

  @IsBoolean(validationBooleanMessage)
  @Transform(({ value} ) => ['true', true].indexOf(value) > -1)
  agree: boolean;
}