import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IBaseEntityCreateDTO } from '../interfaces/base-entity-create-dto.interface';
import { IBaseEntityUpdateDTO } from '../interfaces/base-entity-update-dto.interface';

class Factory {
  create<T>(type: (new () => T)): T {
      return new type();
  }
}

const factory = new Factory();

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number | string;

  @Exclude()
  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;

  @Exclude()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  tsCreate: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  tsUpdate: Date;

  protected abstract updateConcreteFields(dto: IBaseEntityCreateDTO | IBaseEntityUpdateDTO);

  static createFromDTO<T extends BaseEntity>(claz: any, dto: IBaseEntityCreateDTO): T {
    const e = factory.create<T>(claz);
    e.updateFromDTO(dto);
    return e;
  }

  async updateFromDTO(dto: IBaseEntityCreateDTO | IBaseEntityUpdateDTO) {
    await this.updateConcreteFields(dto);
  }

  delete(): void {
    this.isDeleted = true;
  }
}
