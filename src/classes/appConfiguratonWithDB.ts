import 'dotenv/config';
import { DataSource, type DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const domainDefault = 'http://localhost';

export class AppConfigurationWithDB {
  constructor(private env: { [k: string]: string | undefined }) {}

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

  isProduction(): boolean {
    const mode = this.getValue('MODE', false);
    return mode != 'DEV';
  }

  getDataSourceOptions(): DataSourceOptions {
    const root = this.getDirectoryRoot();
    return {
      type: 'postgres',
      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('DB_PORT')),
      username: this.getValue('DB_USER'),
      password: this.getValue('DB_PWD'),
      database: this.getValue('DB_NAME'),
      entities: [`${root}/**/*.entity{.ts,.js}`],
      logger: 'simple-console',
      logging: 'all',
      migrations: [`${root}/migrations/*{.ts,.js}`],
      migrationsRun: true,
      migrationsTableName: 'migrations',
      synchronize: false,
    };
  }

  getApiPrefix(): string {
    return '/api/v1/';
  }

  getAppPort(): string {
    return this.getValue('APP_PORT');
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

  private getDirectoryRoot() {
    return process.env.NODE_ENV === 'migration' ? 'src' : `${__dirname}`;
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }
}
