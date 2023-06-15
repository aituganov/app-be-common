import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IBaseEntityDTOCreate } from '@/interfaces/base-entity-dto-create.interface';
import { IBaseEntityDTOUpdate } from '@/interfaces/base-entity-dto-update.interface';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  tsCreate: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  tsUpdate: Date;

  protected abstract updateConcreteFields(dto: IBaseEntityDTOCreate | IBaseEntityDTOUpdate);

  static createFromDTO<T extends BaseEntity>(dto: IBaseEntityDTOCreate): T {
    const e = this.constructor();
    e.updateFromDTO(dto);
    return e;
  }

  updateFromDTO(dto: IBaseEntityDTOCreate | IBaseEntityDTOUpdate) {
    if ((dto as IBaseEntityDTOUpdate).id) {
      this.id = (dto as IBaseEntityDTOUpdate).id;
    }
    this.updateConcreteFields(dto);
  }

  delete(): void {
    this.isDeleted = true;
  }
}
