import { BaseEntity } from '../entities';
import { RepoReadService } from './repo-read.service';
import { IBaseEntityCreateDTO } from '../interfaces/base-entity-create-dto.interface';
import { IBaseEntityUpdateDTO } from '../interfaces/base-entity-update-dto.interface';
import { type SimpleMap } from '../types';
import { BaseResponse } from '../responses';

export class RepoCRUDService<T extends BaseEntity> extends RepoReadService<T> {
  protected async beforeDBCreate(e: T, map: SimpleMap): Promise<any> {}

  protected async beforeDBUpdate(e: T, map: SimpleMap): Promise<any> {}

  protected async beforeDBDelete(e: T, map: SimpleMap): Promise<any> {}

  protected async saveToDB(e: T): Promise<T> {
    return await this.repo.save(e);
  }
  
  async entityCreate(dto: IBaseEntityCreateDTO, map: SimpleMap = {}): Promise<T> {
    const e = BaseEntity.createFromDTO(this.entityClass, dto) as T;
    await this.beforeDBCreate(e, map);
    return await this.saveToDB(e);
  }

  async create(dto: IBaseEntityCreateDTO, map: SimpleMap = {}): Promise<BaseResponse<T>> {
    const data = await this.entityCreate(dto, map);
    return new BaseResponse({
      data
    });
  }

  async entityUpdate(e: T, dto: IBaseEntityUpdateDTO, map: SimpleMap = {}): Promise<T> {
    e.updateFromDTO(dto);
    await this.beforeDBUpdate(e, map);
    return await this.saveToDB(e);
  }

  async update(dto: IBaseEntityUpdateDTO, map: SimpleMap = {}, where?: any): Promise<BaseResponse<T>> {
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
    return await this.saveToDB(e);
  }

  async delete(id: number, map: SimpleMap = {}, where?: any): Promise<BaseResponse<T>> {
    const data = await this.entityDeleteById(id, map, where);
    return new BaseResponse({
      data
    });
  }
}