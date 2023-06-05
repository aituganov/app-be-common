import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { AppConfigurationWithDB, BadRequestException } from '..';

@Injectable()
export class TransactionService {
  constructor(private dataSource: DataSource) {}

  async do(cb: (manager: EntityManager) => Promise<void>) {
    console.log('Transaction: prepare process');
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    console.log('Transaction: started, try execute');
    try {
      await cb(queryRunner.manager);
      console.log('Transaction: executed');
      await queryRunner.commitTransaction();
      console.log('Transaction: commited');
    } catch (err) {
      console.error('Transaction: error ', err);
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(err.message);
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
      console.log('Transaction: runner released');
    }
  }
}

export const makeFactory = (configuration: AppConfigurationWithDB) => ({
  provide: TransactionService,
  useFactory: async () => {
    const ds = await configuration.getDataSource().initialize();
    return new TransactionService(ds);
  }
});