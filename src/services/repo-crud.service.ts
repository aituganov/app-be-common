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
    this.logger.debug(`Try to create ${this.entityName} with params #${JSON.stringify(dto)} and map ${JSON.stringify(map)}...`);
    const e = BaseEntity.createFromDTO(this.entityClass, dto) as T;
    await this.beforeDBCreate(e, map);
    const $p = await this.saveToDB(e);
    this.logger.debug('Created!');
    return $p;
  }

  async create(dto: IBaseEntityCreateDTO, map: SimpleMap = {}): Promise<BaseResponse<T>> {
    const data = await this.entityCreate(dto, map);
    return new BaseResponse({
      data
    });
  }

  async entityUpdate(e: T, dto: IBaseEntityUpdateDTO, map: SimpleMap = {}): Promise<T> {
    this.logger.debug(`Try to update ${this.entityName} #${e.id} with params #${JSON.stringify(dto)} and map ${JSON.stringify(map)}...`);
    e.updateFromDTO(dto);
    await this.beforeDBUpdate(e, map);
    const $p = await this.saveToDB(e);
    this.logger.debug('Updated!');
    return $p;
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
    this.logger.debug(`Try to delete ${this.entityName} #${e.id} with map ${JSON.stringify(map)}...`);
    e.delete();
    await this.beforeDBDelete(e, map);
    const $p = await this.saveToDB(e);
    this.logger.debug('Deleted!');
    return $p;
  }

  async delete(id: number, map: SimpleMap = {}, where?: any): Promise<BaseResponse<T>> {
    const data = await this.entityDeleteById(id, map, where);
    return new BaseResponse({
      data
    });
  }
}