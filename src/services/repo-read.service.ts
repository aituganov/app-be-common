import { NotFoundException } from '@/exceptions';
import { MultilanguageMessage, BaseResponse } from '@/responses';
import { FindOptionsRelations, Repository } from 'typeorm';
import { type BaseEntity } from '../entities/base.entity';

export class RepoReadService<T extends BaseEntity> {
  protected entityName: MultilanguageMessage;

  constructor(entityName: MultilanguageMessage, protected readonly repo: Repository<T>) {
    this.entityName = entityName;
    this.repo = repo;
  }

  protected async readEntity(id: number, where?: any, relations?: FindOptionsRelations<T>): Promise<T> {
    const preparedWhere = where || {
      id
    };
    const data = await this.repo.findOne({ where: preparedWhere, relations });
    if (!data) {
      throw new NotFoundException({
        en: `${this.entityName.en} #${id} not found`,
        ru: `Запрашиваемый ${this.entityName.ru} #${id} не найден`
      });
    }
    return data;
  }

  async read(id: number, where?: any, relations?: FindOptionsRelations<T>): Promise<BaseResponse<T>> {
    return new BaseResponse({
      data: await this.readEntity(id, where, relations)
    });
  }
}