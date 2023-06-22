import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { PaymentInitDTO } from './payment-init.dto';
import { IBaseEntityCreateDTO } from '../../interfaces';
import { AvailableCurrencies } from '../../types/payment.type';
import { FieldsValidation, validationNumberMessage, validationNumberMaxMessage, validationNumberMinMessage, validationStringMessage } from '../../validations';

export class PaymentCreateDTO extends PaymentInitDTO implements IBaseEntityCreateDTO {ng;
  @IsOptional()
  @IsNumber({ }, validationNumberMessage)
  @Type(() => Number)
  parentPaymentId: number;

  @IsNumber({ }, validationNumberMessage)
  @Min(FieldsValidation.Price.Min, validationNumberMinMessage)
  @Max(FieldsValidation.Price.Max, validationNumberMaxMessage)
  amount: number;

  @IsEnum(AvailableCurrencies)
  currency: AvailableCurrencies;
}