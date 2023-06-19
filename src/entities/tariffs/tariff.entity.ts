import { Column } from 'typeorm';
import { Max, MaxLength, Min } from 'class-validator';
import { BaseEntity } from '../base.entity';
import { AvailableCurrencies } from '../../types/payment.type';
import { ColumnDecimalTransformer } from '../../transformers/index';
import { FieldsValidation } from '../../validations/fields.validation';
import { TariffDayPeriods, TariffTrialDayPeriods } from '../../constants/period.constant';

export const TariffEntityName = 'tariff';

export abstract class TariffEntity extends BaseEntity {
  @Column('text')
  @MaxLength(FieldsValidation.Length.Name)
  title: string;

  @Column('text', { nullable: true })
  @MaxLength(FieldsValidation.Length.Description)
  descriptionOwn: string;

  @Column('text', { nullable: true })
  @MaxLength(FieldsValidation.Length.Description)
  descriptionPublic: string;

  @Min(TariffDayPeriods.Week)
  @Max(TariffDayPeriods.Onetime)
  @Column('int', { default: TariffDayPeriods.Month })
  daysCount: number;

  @Column('boolean', { default: false })
  isRecurrent: boolean;

  @Min(TariffTrialDayPeriods.None)
  @Max(TariffTrialDayPeriods.Month)
  @Column('int', { default: TariffTrialDayPeriods.None })
  daysCountTrial: number;

  @Min(FieldsValidation.Price.Min)
  @Max(FieldsValidation.Price.Max)
  @Column('decimal', {
    precision: 38,
    scale: 19,
    transformer: new ColumnDecimalTransformer()
  })
  price: number;

  @Column('enum', {
    enum: Object.values(AvailableCurrencies),
    enumName: 'available_currencies'
  })
  currency: AvailableCurrencies;
}