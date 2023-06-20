import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { IBaseEntityDTOCreate } from '../../interfaces';
import { PaymentMethodTypes } from '../../types/payment.type';
import { FieldsValidation, validationBooleanTransform, validationBooleanMessage, validationLengthMessage, validationStringMessage, validationNumberMessage, validationNumberMinMessage, validationNumberMaxMessage } from '../../validations';

export class PaymentMethodDTO implements IBaseEntityDTOCreate {
  @IsString(validationStringMessage)
  @Length(FieldsValidation.Length.UUID_V4, FieldsValidation.Length.UUID_V4, validationLengthMessage)
  methodId: string;

  @IsEnum(PaymentMethodTypes)
  type: PaymentMethodTypes;

  @IsBoolean(validationBooleanMessage)
  @Transform(validationBooleanTransform)
  saved: boolean;

  @IsString(validationStringMessage)
  title: string;

  // Alfa
  @IsOptional()
  @IsString(validationStringMessage)
  login: string;

  // Card
  @IsOptional()
  @IsString(validationStringMessage)
  cardFirsPart: string;

  @IsOptional()
  @IsString(validationStringMessage)
  cardLastPart: string;

  @IsOptional()
  @Min(new Date().getFullYear(), validationNumberMinMessage)
  @Max(2222, validationNumberMaxMessage)
  @IsNumber({ }, validationNumberMessage)
  cardExpYear: number;

  @IsOptional()
  @Min(1, validationNumberMinMessage)
  @Max(12, validationNumberMaxMessage)
  @IsNumber({ }, validationNumberMessage)
  cardExpMonth: number;

  @IsOptional()
  @IsString(validationStringMessage)
  cardType: string;

  @IsOptional()
  @IsString(validationStringMessage)
  cardIssuerCountry: string;

  // Yoo money
  @IsOptional()
  @IsString(validationStringMessage)
  accountNumber: string;
}