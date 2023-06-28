import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { DataSource, type DataSourceOptions } from 'typeorm';

const domainDefault = 'http://localhost';
export const MS_APP_PORT_ENV = 'MS_APP_PORT';
export const MS_APP_MAIN_PORT_ENV = 'MS_APP_MAIN_PORT';
export const MS_AUTH_PORT_ENV = 'MS_AUTH_PORT';
export const MS_PAY_PORT_ENV = 'MS_PAY_PORT';
export const MS_SUB_PORT_ENV = 'MS_SUB_PORT';
export const MS_TG_PORT_ENV = 'MS_TG_PORT';

export class AppConfigurationWithDB {
  constructor(protected env: { [k: string]: string | undefined }) {}

  static requiredEnvironmentVars = [
    'APP_PORT',
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PWD',
    'DB_NAME'
  ];

  ensureValues(keys: string[]): AppConfigurationWithDB {
    keys.forEach((k: string) => this.getValue(k, true));
    return this;
  }

  getDataSourceOptions(): DataSourceOptions {
    return {
      type: 'postgres',
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PWD'),
      database: this.getValue('DB_NAME'),
      entities: this.getEntities(),
      logger: 'simple-console',
      logging: 'all',
      migrations: this.getMigrations(),
      migrationsRun: true,
      migrationsTableName: 'migrations',
      synchronize: false,
    };
  }

  getApiPrefix(): string {
    return '/api/v1/';
  }
  getAppHost(): string {
    return this.getValue('APP_HOST', false) || '127.0.0.1';
  }
  
  getAppPort(): number {
    return +this.getValue('APP_PORT');
  }

  getMSAppPort(): number {
    return +this.getValue(MS_APP_PORT_ENV, true);
  }

  getMSAppMainPort(): number {
    return +this.getValue(MS_APP_MAIN_PORT_ENV, true);
  }

  getMSAuthPort(): number {
    return +this.getValue(MS_AUTH_PORT_ENV, true);
  }

  getMSPayPort(): number {
    return +this.getValue(MS_PAY_PORT_ENV, true);
  }

  getMSSubPort(): number {
    return +this.getValue(MS_SUB_PORT_ENV, true);
  }

  getMSTgPort(): number {
    return +this.getValue(MS_TG_PORT_ENV, true);
  }

  getDataSource(): DataSource {
    return new DataSource(this.getDataSourceOptions());
  }

  getDomain(): string {
    return this.getValue('APP_DOMAIN', false) || `${domainDefault}:3009`;
  }

  getDomainApi(): string {
    const domain = this.getValue('APP_DOMAIN', false) || `${domainDefault}:${this.getValue('APP_PORT')}`;
    return `${domain}${this.getApiPrefix()}`;
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    const cfg = this.getDataSourceOptions() as TypeOrmModuleOptions;
    cfg.autoLoadEntities = true;
    return cfg;
  }

  protected isMigration() {
    return process.env.NODE_ENV === 'migration';
  }

  protected getEntities() {
    return [this.isMigration() ? 'src/**/*.entity.ts' : 'dist/**/*.entity.js'];
  }
  protected getMigrations() {
      return [this.isMigration() ? 'src/migrations/*.ts' : 'dist/migrations/*.js'];
  }

  protected getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }
}
