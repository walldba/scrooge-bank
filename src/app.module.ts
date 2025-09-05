import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/database.config';
import { YmlConfig } from './config/yml.config.loader';
import { addTransactionalDataSource } from 'typeorm-transactional';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [YmlConfig.load],
    }),
    TypeOrmModule.forRootAsync({
      dataSourceFactory: async () => {
        if (!AppDataSource.isInitialized) {
          await AppDataSource.initialize();
        }
        return addTransactionalDataSource(AppDataSource);
      },
      useFactory: () => ({}),
    }),
  ],
})
export class AppModule {}
