import { FindOptionsRelations, Repository } from 'typeorm';
import { type BaseEntity } from '../entities/base.entity';
import { NotFoundException } from '../exceptions';
import { MultilanguageMessage, BaseResponse } from '../responses';
import { type SimpleMap } from '../types';

export type RepoReadParams<T> = {
  entityName: MultilanguageMessage;
  readRelations?: FindOptionsRelations<T>;
  repo: Repository<T>;
};

export class RepoReadService<T extends BaseEntity> {
  protected entityName: MultilanguageMessage;
  protected readRelations: FindOptionsRelations<T>;
  protected readonly repo: Repository<T>

  constructor(params: RepoReadParams<T>) {
    this.entityName = params.entityName;
    this.readRelations = params.readRelations;
    this.repo = params.repo;
  }

  protected async beforeDBRead(id: number, map: SimpleMap): Promise<any> {}

  protected async checkAccess(e: T, map: SimpleMap): Promise<Boolean> {
    return true;
  }

  protected async readEntity(id: number, where?: any, map: SimpleMap = {}): Promise<T> {
    await this.beforeDBRead(id, map);
    const preparedWhere = where || {
      id
    };
    const data = await this.repo.findOne({ where: preparedWhere, relations: this.readRelations });
    if (!data) {
      throw new NotFoundException({
        en: `${this.entityName.en} not found`,
        ru: `Запрашиваемый ${this.entityName.ru} не найден`
      });
    }
    if (!(await this.checkAccess(data, map))) {
      throw new NotFoundException({
        en: `Access denied`,
        ru: `Доступ запрещен`
      });
    }
    return data;
  }

  async read(id: number, where?: any, map?: SimpleMap): Promise<BaseResponse<T>> {
    return new BaseResponse({
      data: await this.readEntity(id, where, map)
    });
  }
}