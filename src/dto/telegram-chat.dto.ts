import { ArrayNotEmpty, IsEnum, IsOptional, IsString } from 'class-validator';
import { TelegramChatTypes } from '../entities';
import { IBaseEntityDTOCreate } from '../interfaces/base-entity-dto-create.interface';
import { validationArrayNotEmptyMessage, validationStringMessage } from '../validations';

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