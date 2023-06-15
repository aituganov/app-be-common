import { BaseEntity } from '../entities';
import { RepoReadService } from './repo-read.service';
import { IBaseEntityDTOCreate } from '../interfaces/base-entity-dto-create.interface';
import { IBaseEntityDTOUpdate } from '../interfaces/base-entity-dto-update.interface';
import { type SimpleMap } from '../types';
import { BaseResponse } from '../responses';

export class RepoCRUDService<T extends BaseEntity> extends RepoReadService<T> {
  protected async beforeDBCreate(e: T, map: SimpleMap): Promise<any> {}

  protected async beforeDBUpdate(e: T, map: SimpleMap): Promise<any> {}

  protected async beforeDBDelete(e: T, map: SimpleMap): Promise<any> {}
  
  async entityCreate(dto: IBaseEntityDTOCreate, map: SimpleMap = {}): Promise<T> {
    const e = BaseEntity.createFromDTO(this.entityClass, dto) as T;
    await this.beforeDBCreate(e, map);
    return await this.repo.save<T>(e);
  }

  async create(dto: IBaseEntityDTOCreate, map: SimpleMap = {}): Promise<BaseResponse<T>> {
    const data = await this.entityCreate(dto, map);
    return new BaseResponse({
      data
    });
  }

  async entityUpdate(e: T, dto: IBaseEntityDTOUpdate, map: SimpleMap = {}): Promise<T> {
    e.updateFromDTO(dto);
    await this.beforeDBUpdate(e, map);
    return await this.repo.save(e);
  }

  async update(dto: IBaseEntityDTOUpdate, map: SimpleMap = {}, where?: any): Promise<BaseResponse<T>> {
    const e = await this.readEntity(dto.id, map, where);
    const data = await this.entityUpdate(e, dto, map);
    return new BaseResponse({
      data
    });
  }

  async entityDeleteById(id: number, map: SimpleMap = {}, where?: any): Promise<T> {
    const e = await this.readEntity(id, map, where);
    return await this.entityDelete(e, map);
  }

  async entityDelete(e: T, map: SimpleMap = {}): Promise<T> {
    e.delete();
    await this.beforeDBDelete(e, map);
    return await this.repo.save(e);
  }

  async delete(id: number, map: SimpleMap = {}, where?: any): Promise<BaseResponse<T>> {
    const data = await this.entityDeleteById(id, map, where);
    return new BaseResponse({
      data
    });
  }
}