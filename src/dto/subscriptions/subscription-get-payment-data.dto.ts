import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { IBaseEntityCreateDTO } from '../../interfaces/base-entity-create-dto.interface';
import { validationNumberMessage } from '../../validations/messages.validation';

export class SubscriptionGetPaymentDataDTO implements IBaseEntityCreateDTO {
  @IsNumber({ }, validationNumberMessage)
  @Type(() => Number)
  customerId: number;

  @IsNumber({ }, validationNumberMessage)
  @Type(() => Number)
  tariffId: number;
}