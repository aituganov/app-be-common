import { ArrayNotEmpty, IsEnum, IsInt, IsOptional, IsString, IsUrl, MaxLength, ValidateNested } from 'class-validator';
import { TelegramChatTypes } from '../entities';
import { IBaseEntityDTOCreate } from '../interfaces/base-entity-dto-create.interface';
import { FieldsValidation, validationArrayNotEmptyMessage, validationLengthMaxMessage, validationNumberMessage, validationStringMessage, validationUrlMessage } from '../validations';
import { Type } from 'class-transformer';

export class TelegramChatDTO implements IBaseEntityDTOCreate {
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

export class ChatMemberDTO extends ChatDTO {
  @IsInt(validationNumberMessage )
  userId: number;
}

export class NotificationDTO extends ChatDTO {
  @IsString(validationStringMessage)
  @MaxLength(FieldsValidation.Length.Telegram.Message, validationLengthMaxMessage)
  text: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ChatButtonDTO)
  buttons?: ChatButtonDTO[];
}