import { ColumnOptions } from 'typeorm';

export const paymentColumnOpts: ColumnOptions = { type: 'decimal', precision: 9, scale: 3, nullable: true };