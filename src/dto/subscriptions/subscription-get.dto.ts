import { IsNumber } from 'class-validator';
import { validationNumberMessage } from '../../validations';

export class SubscriptioGetDTO {
  @IsNumber({ }, validationNumberMessage)
  id: number;

  @IsNumber({ }, validationNumberMessage)
  customerId: number;
}