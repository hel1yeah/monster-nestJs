import { DataSourceOptions } from 'typeorm';
import { CONNECTION } from './db.connection';

const config: DataSourceOptions = {
  ...CONNECTION,
  // type: CONNECTION.type,
  // host: CONNECTION.host,
  // port: CONNECTION.port,
  // username: CONNECTION.username,
  // password: CONNECTION.password,
  // database: CONNECTION.database,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [__dirname + '/**/*.migration{.ts,.js}', 'src/migrations/*.ts'],
  // logging: true,
  // dropSchema: true,
};

export default config;
