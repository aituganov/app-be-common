import { Logger } from '@nestjs/common';
import { FindOptionsOrder, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { BadRequestException, NotFoundException } from '../exceptions';
import { MultilanguageMessage, BaseResponse, ListResponse } from '../responses';
import { type SimpleMap } from '../types';

export type RepoReadParams<T extends BaseEntity> = {
  entityClass: (new () => T),
  entityName: MultilanguageMessage;
  readRelations?: FindOptionsRelations<T>;
  repo: Repository<T>;
};

export class RepoReadService<T extends BaseEntity> {
  protected entityClass: (new () => T);
  protected entityName: MultilanguageMessage;
  protected readRelations: FindOptionsRelations<T>;
  protected readonly repo: Repository<T>

  constructor(params: RepoReadParams<T>) {
    this.entityClass = params.entityClass;
    this.entityName = params.entityName;
    this.readRelations = params.readRelations;
    this.repo = params.repo;
  }

  protected async beforeDBRead(id: number | string, map: SimpleMap): Promise<any> {}

  protected async checkAccess(e: T, map: SimpleMap): Promise<Boolean> {
    return true;
  }

  async readEntity(id: number | string, map: SimpleMap = {}, where?: FindOptionsWhere<T>): Promise<T> {
    await this.beforeDBRead(id, map);
    const preparedWhere = where || {
      id
    } as FindOptionsWhere<T>;
    const data = await this.repo.findOne({ where: preparedWhere, relations: this.readRelations });
    if (!data) {
      throw new NotFoundException({
        en: `${this.entityName.en} not found`,
        ru: `Запрашиваемый ${this.entityName.ru} не найден`
      });
    }
    if (!(await this.checkAccess(data, map))) {
      throw new BadRequestException({
        en: `Access denied`,
        ru: `Доступ запрещен`
      });
    }
    return data;
  }

  async read(id: number, map: SimpleMap = {}, where?: FindOptionsWhere<T>): Promise<BaseResponse<T>> {
    return new BaseResponse({
      data: await this.readEntity(id, map, where)
    });
  }

  async listNotDeleted(where: FindOptionsWhere<T>, order?: FindOptionsOrder<T>): Promise<ListResponse<T>> {
    const res = await this.repo.findAndCount({ 
      where: { ...where, isDeleted: false } as FindOptionsWhere<T>,
      order: order || ({ tsCreate: 'ASC' } as FindOptionsOrder<T>)
    });
    return new ListResponse<T>({
      items: res[0],
      count: res[1]
    });
  }
}