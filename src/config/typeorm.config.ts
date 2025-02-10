import { DataSource } from 'typeorm';
// import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

// const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'mediumclone',
  password: 'redbull',
  database: 'mediumclone',
  synchronize: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*.ts'],

  migrationsRun: false,
  logging: true,
});

export default AppDataSource;

// "test:e2e": "jest --config ./test/jest-e2e.json",
// "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js --dataSource=src/data-source.ts",
// "db:drop": "npm run typeorm schema:drop",
// "db:create": "npm run typeorm -- migration:generate src/migrations -- -n",
// "migration:create": "npm run typeorm -- migration:create src/migrations -- -n"
