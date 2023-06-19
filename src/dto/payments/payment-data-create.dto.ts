import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsEnum, IsNumber, IsString, Length, Max, MaxLength, Min } from 'class-validator';
import { IBaseEntityDTOUpdate } from '../../interfaces';
import { AvailableCurrencies } from '../../types/payment.type';
import { FieldsValidation, validationBooleanMessage, validationNumberMessage, validationStringMessage, validationNumberMaxMessage, validationNumberMinMessage, validationLengthMessage } from '../../validations';

export class PaymentDataCreateDTO implements IBaseEntityDTOUpdate {
  @IsString(validationStringMessage)
  @Length(FieldsValidation.Length.UUID_V4, FieldsValidation.Length.UUID_V4, validationLengthMessage)
  id: string;

  @IsNumber({ }, validationNumberMessage)
  @Type(() => Number)
  customerId: number;

  @IsBoolean(validationBooleanMessage)
  @Transform(({ value} ) => ['true', true].indexOf(value) > -1)
  customerAgree: boolean;
  
  @IsNumber({ }, validationNumberMessage)
  @Type(() => Number)
  tariffId: number;

  @MaxLength(FieldsValidation.Length.Email)
  @IsEmail({ },validationStringMessage)
  email: string;

  @MaxLength(FieldsValidation.Length.Pnone.Code)
  @IsString(validationStringMessage)
  phoneCode: string;

  @MaxLength(FieldsValidation.Length.Pnone.Number)
  @IsString(validationStringMessage)
  phoneNumber: string;

  @IsNumber({ }, validationNumberMessage)
  @Min(FieldsValidation.Price.Min, validationNumberMinMessage)
  @Max(FieldsValidation.Price.Max, validationNumberMaxMessage)
  amount: number;

  @IsEnum(AvailableCurrencies)
  currency: AvailableCurrencies;

  @MaxLength(FieldsValidation.Length.Payment.Description)
  @IsString(validationStringMessage)
  description: string;

  @IsBoolean(validationBooleanMessage)
  @Transform(({ value} ) => ['true', true].indexOf(value) > -1)
  isRecurrent: boolean;
}