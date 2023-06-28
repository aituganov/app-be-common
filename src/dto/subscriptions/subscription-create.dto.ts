import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty } from 'class-validator';
import { SubscriptionInitDTO } from './subscription-init.dto';
import { IBaseEntityCreateDTO } from '../../interfaces/base-entity-create-dto.interface';
import { SubscriptionStatuses, SubscriptionTypes } from '../../types';
import { validationDateMessage, validationRequiredMessage } from '../../validations';

export class SubscriptionCreateDTO extends SubscriptionInitDTO implements IBaseEntityCreateDTO {
  @IsEnum(SubscriptionTypes)
  type: SubscriptionTypes;

  @IsEnum(SubscriptionStatuses)
  status: SubscriptionStatuses;

  @IsNotEmpty(validationRequiredMessage)
  @Transform(({ value }) => new Date(value))
  @IsDate(validationDateMessage)
  tsFrom: Date;

  @IsNotEmpty(validationRequiredMessage)
  @Transform(({ value }) => new Date(value))
  @IsDate(validationDateMessage)
  tsTo: Date;
}