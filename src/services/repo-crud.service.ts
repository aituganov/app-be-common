import { BaseEntity } from '../entities';
import { RepoReadService } from './repo-read.service';
import { IBaseEntityDTOCreate } from '../interfaces/base-entity-dto-create.interface';
import { IBaseEntityDTOUpdate } from '../interfaces/base-entity-dto-update.interface';
import { type SimpleMap } from '../types';

export class RepoCRUDService<T extends BaseEntity> extends RepoReadService<T> {
  

  protected async beforeCreate(e: T, map?: SimpleMap): Promise<any> {}

  protected async beforeUpdate(e: T, map?: SimpleMap): Promise<any> {}

  protected async beforeDelete(e: T, map?: SimpleMap): Promise<any> {}
  
  async entityCreate(dto: IBaseEntityDTOCreate, map?: SimpleMap): Promise<T> {
    const e = BaseEntity.createFromDTO(dto) as T;
    await this.beforeCreate(e, map);
    return await this.repo.save<T>(e);
  }

  async entityUpdate(e: T, dto: IBaseEntityDTOUpdate, map?: SimpleMap): Promise<T> {
    e.updateFromDTO(dto);
    await this.beforeUpdate(e, map);
    return await this.repo.save(e);
  }

  async entityDeleteById(id: number, where?: any, map?: SimpleMap): Promise<T> {
    const e = await this.readEntity(id, where, map);
    return await this.entityDelete(e, map);
  }

  async entityDelete(e: T, map?: SimpleMap): Promise<T> {
    e.delete();
    await this.beforeDelete(e, map);
    return await this.repo.save(e);
  }
}