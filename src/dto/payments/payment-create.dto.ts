import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, Max, Min } from 'class-validator';
import { PaymentInitDTO } from './payment-init.dto';
import { IBaseEntityCreateDTO } from '../../interfaces';
import { AvailableCurrencies } from '../../types/payment.type';
import { FieldsValidation, validationBooleanMessage, validationNumberMessage, validationNumberMaxMessage, validationNumberMinMessage } from '../../validations';

export class PaymentCreateDTO extends PaymentInitDTO implements IBaseEntityCreateDTO {
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