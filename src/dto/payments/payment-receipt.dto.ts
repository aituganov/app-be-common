import { IsEmail, IsNumber, IsString, MaxLength } from 'class-validator';
import { IBaseEntityDTOCreate } from '../../interfaces';
import { FieldsValidation, validationNumberMessage, validationStringMessage } from '../../validations';

export class PaymentReceiptDTO implements IBaseEntityDTOCreate {
  @IsNumber({ }, validationNumberMessage)
  ownerId: number;

  @MaxLength(FieldsValidation.Length.Email)
  @IsEmail({ },validationStringMessage)
  email: string;

  @MaxLength(FieldsValidation.Length.Pnone.Code)
  @IsString(validationStringMessage)
  phoneCode: string;

  @MaxLength(FieldsValidation.Length.Pnone.Number)
  @IsString(validationStringMessage)
  phoneNumber: string;
}