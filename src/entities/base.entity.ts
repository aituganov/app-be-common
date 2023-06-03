import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export class BaseEntity {
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

  public delete(): void {
    this.isDeleted = true
  }
}
