import { Logger } from '@nestjs/common';
import { FindOptionsOrder, FindOptionsRelations, FindOptionsWhere, In, Repository } from 'typeorm';
import { BaseEntity } from '../entities/base.entity';
import { BadRequestException, NotFoundException } from '../exceptions';
import { MultilanguageMessage, BaseResponse, ListResponse } from '../responses';
import { type SimpleMap } from '../types';

export type RepoReadParams<T extends BaseEntity> = {
  entityClass: (new () => T),
  entityName: MultilanguageMessage;
  logger: Logger;
  readRelations?: FindOptionsRelations<T>;
  repo: Repository<T>;
};

export class RepoReadService<T extends BaseEntity> {
  protected entityClass: (new () => T);
  protected entityName: MultilanguageMessage;
  protected logger: Logger;
  protected readRelations: FindOptionsRelations<T>;
  protected readonly repo: Repository<T>

  constructor(params: RepoReadParams<T>) {
    this.entityClass = params.entityClass;
    this.entityName = params.entityName;
    this.logger = params.logger;
    this.readRelations = params.readRelations;
    this.repo = params.repo;
  }

  protected async beforeDBRead(id: number | string, map: SimpleMap): Promise<any> {}

  protected async checkAccess(e: T, map: SimpleMap): Promise<Boolean> {
    return true;
  }

  async getMapByIds(ids: number[]): Promise<{ [id: string]: T }> {
    const res = await this.listNotDeleted({ id: In(ids) } as FindOptionsWhere<T>);
    const map = {};
    res.data.items.forEach(item => map[item.id] = item);
    return map;
  }

  async readEntity(id: number | string, map: SimpleMap = {}, where?: FindOptionsWhere<T>): Promise<T> {
    this.logger.debug(`Try to find ${JSON.stringify(this.entityName)} #${id}, with map ${JSON.stringify(map)}...`);
    await this.beforeDBRead(id, map);
    const preparedWhere = where || {
      id
    } as FindOptionsWhere<T>;
    this.logger.debug(`Prepared WHERE is ${JSON.stringify(where)}`);
    const data = await this.repo.findOne({
      where: preparedWhere,
      relations: this.readRelations
    });
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
    this.logger.debug('Found!');
    return data;
  }

  async read(id: number, map: SimpleMap = {}, where?: FindOptionsWhere<T>): Promise<BaseResponse<T>> {
    return new BaseResponse({
      data: await this.readEntity(id, map, where)
    });
  }

  async listNotDeleted(where: FindOptionsWhere<T>, order?: FindOptionsOrder<T>): Promise<ListResponse<T>> {
    this.logger.debug(`Try to find not deleted ${JSON.stringify(this.entityName)} items with WHERE ${JSON.stringify(where)} and ORDER ${JSON.stringify(order)}...`);
    const res = await this.repo.findAndCount({ 
      where: { ...where, isDeleted: false } as FindOptionsWhere<T>,
      order: order || ({ tsCreate: 'ASC' } as FindOptionsOrder<T>),
      relations: this.readRelations
    });
    this.logger.debug(`Found ${res[1]} items!`);
    return new ListResponse<T>({
      items: res[0],
      count: res[1]
    });
  }
}