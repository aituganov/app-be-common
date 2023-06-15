import { BaseEntity } from '../entities';
import { RepoReadService } from './repo-read.service';
import { IBaseEntityDTOCreate } from '../interfaces/base-entity-dto-create.interface';
import { IBaseEntityDTOUpdate } from '../interfaces/base-entity-dto-update.interface';

export class RepoCRUDService<T extends BaseEntity> extends RepoReadService<T> {
  async entityCreate(dto: IBaseEntityDTOCreate): Promise<T> {
    const entity = BaseEntity.createFromDTO(dto) as T;
    return await this.repo.save<T>(entity);
  }

  async entityUpdate(e: T, dto: IBaseEntityDTOUpdate): Promise<T> {
    e.updateFromDTO(dto);
    return await this.repo.save(e);
  }

  async entityDelete(id: number): Promise<T> {
    const e = await this.readEntity(id);
    e.delete();
    return await this.repo.save(e);
  }
}