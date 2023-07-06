import { IsNumber } from 'class-validator';
import { validationNumberMessage } from 'src/validations';

export class SubscriptioGetDTO {
  @IsNumber({ }, validationNumberMessage)
  id: number;

  @IsNumber({ }, validationNumberMessage)
  customerId: number;
}