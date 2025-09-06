import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5433,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'password',
  database:
    process.env.NODE_ENV === 'test' ? 'scrooge_bank_test' : 'scrooge_bank',
  entities: [join(__dirname, '..', '**', '*.entity.{js,ts}')],
  migrations: [join(__dirname, '..', 'migrations', '*.{ts,js}')],
  synchronize: true,
  autoLoadEntities: true,
  migrationsRun: process.env.NODE_ENV === 'production',
  logging: false,
} as DataSourceOptions);
