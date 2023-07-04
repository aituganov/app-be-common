import { validationNumberMessage } from '../../validations';
import { IsNumber } from 'class-validator';

export class PaymentRepeatDTO {
  @IsNumber({ }, validationNumberMessage)
  paymentId: number;

  @IsNumber({ }, validationNumberMessage)
  subscriptionId: number;
}