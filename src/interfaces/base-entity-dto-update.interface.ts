import { IBaseEntityDTOCreate } from './base-entity-dto-create.interface';

export interface IBaseEntityDTOUpdate extends IBaseEntityDTOCreate {
  id: number | string;
}