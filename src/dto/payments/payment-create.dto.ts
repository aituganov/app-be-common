import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsString, Length, Max, Min } from 'class-validator';
import { PaymentInitDTO } from './payment-init.dto';
import { IBaseEntityDTOCreate } from '../../interfaces';
import { AvailableCurrencies } from '../../types/payment.type';
import { FieldsValidation, validationBooleanMessage, validationNumberMessage, validationStringMessage, validationNumberMaxMessage, validationNumberMinMessage, validationLengthMessage } from '../../validations';

export class PaymentCreateDTO extends PaymentInitDTO implements IBaseEntityDTOCreate {
  @IsString(validationStringMessage)
  @Length(FieldsValidation.Length.UUID_V4, FieldsValidation.Length.UUID_V4, validationLengthMessage)
  dataId: string;  

  @IsNumber({ }, validationNumberMessage)
  @Min(FieldsValidation.Price.Min, validationNumberMinMessage)
  @Max(FieldsValidation.Price.Max, validationNumberMaxMessage)
  amount: number;

  @IsEnum(AvailableCurrencies)
  currency: AvailableCurrencies;

  @IsBoolean(validationBooleanMessage)
  @Transform(({ value} ) => ['true', true].indexOf(value) > -1)
  isRecurrent: boolean;
}