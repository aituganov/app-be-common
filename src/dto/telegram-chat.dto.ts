import { ArrayNotEmpty, IsEnum, IsInt, IsOptional, IsString, IsUrl, MaxLength, ValidateNested } from 'class-validator';
import { TelegramChatTypes, TelegramMessageStatuses } from '../entities';
import { IBaseEntityCreateDTO } from '../interfaces/base-entity-create-dto.interface';
import { FieldsValidation, validationArrayNotEmptyMessage, validationLengthMaxMessage, validationNumberMessage, validationStringMessage, validationUrlMessage } from '../validations';
import { Transform, Type } from 'class-transformer';
import { dtoNumberTransformer } from '..';

export class TelegramChatDTO implements IBaseEntityCreateDTO {
  @IsString(validationStringMessage)
  chatId: string;

  @IsString(validationStringMessage)
  ownerId: string;

  @ArrayNotEmpty(validationArrayNotEmptyMessage)
  @IsString({...validationStringMessage, each: true})
  adminIds: string[];
  
  @IsEnum(TelegramChatTypes)
  type: TelegramChatTypes;

  @IsOptional()
  @IsString(validationStringMessage)
  photo?: string;

  @IsString(validationStringMessage)
  title: string;

  @IsOptional()
  @IsString(validationStringMessage)
  description?: string;

  @IsOptional()
  @IsString(validationStringMessage)
  username?: string;
}

export class ChatDTO {
  @IsInt({ message: 'Chat id required in number format: positive for peoples, negative for chats' })
  chatId: number;
}

export class ChatButtonDTO {
  @IsString(validationStringMessage)
  text: string;

  @IsString(validationStringMessage)
  @IsUrl({ }, validationUrlMessage)
  url: string;
}

export class ChatMemberDTO {
  @IsInt({ ...validationNumberMessage, each: true })
  @ArrayNotEmpty(validationArrayNotEmptyMessage)
  @Transform(dtoNumberTransformer)
  chatIds: number[];

  @IsInt(validationNumberMessage)
  @Transform(dtoNumberTransformer)
  userId: number;

  @IsOptional()
  @IsString(validationStringMessage)
  messagePrefix?: string;
}

export class NotificationDTO extends ChatDTO implements IBaseEntityCreateDTO {
  @IsString(validationStringMessage)
  @MaxLength(FieldsValidation.Length.Telegram.Message, validationLengthMaxMessage)
  text: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ChatButtonDTO)
  buttons?: ChatButtonDTO[];
}

export class TelegramMessageDTO extends NotificationDTO {
  @IsInt(validationNumberMessage)
  fromBotId: number;

  @IsEnum(TelegramMessageStatuses)
  status: TelegramMessageStatuses;
}